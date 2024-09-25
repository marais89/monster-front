import {Component, OnInit} from '@angular/core';
import {LanguageUtils} from '../utils/language-utils';
import {Individu} from '../model/individu';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {IndividuApiService} from '../shared/individu/individu-api.service';
import {IndividuService} from '../shared/individu/individu.service';
import {isNullOrUndefined} from 'util';
import {ScheduleApiService} from '../shared/schedule/schedule-api.service';
import {BusinessApiService} from '../shared/business/businessApiService';
import {concatMap} from 'rxjs/operators';
import {Activity} from '../model/activity';
import {Project} from '../model/project';
import {Period} from '../model/period';
import {Schedule} from '../model/schedule';
import {DatePipe} from '@angular/common';
import {WeeksPlanning} from '../model/weekesPlanning';
import {UserBusinessRelationService} from '../shared/userBusinessRelation/user-business-relation.service';
import {UserBusinessRelation, UserBusinessRole} from '../model/business/user-business-relation';
import {Business} from '../model/business/business';
import {DialogType} from '../individu-create/individu-create.component';
import {DialogInfoComponent, DialogInformation} from '../dialog-info/dialog-info.component';
import {Holiday} from '../model/holiday';

const ONE_DAY = 24 * 60 * 60 * 1000;

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {

  WORDING = LanguageUtils.getWordingLanguage();
  individu: Individu;
  projectList: Array<Project>;
  selectedDayIndex: number = 0;
  preloadedWeeks: WeeksPlanning = new WeeksPlanning([], [], []);
  freeDays: Date[] = [new Date('2023-05-29'), new Date('2023-05-22')];
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weekend: string[] = ['Saturday', 'Sunday'];
  myUserBusinessRelationList: UserBusinessRelation[] = [];
  selectedUserBusinessRelation: UserBusinessRelation;
  private displayMsg: boolean = false;

  constructor(private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private individuServiceApi: IndividuApiService,
              private individuService: IndividuService,
              private scheduleServiceApi: ScheduleApiService,
              private userBusinessRelationService: UserBusinessRelationService,
              private businessApi: BusinessApiService,
              public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.loadUserBusiness();
  }

  loadUserBusiness(): void {
    this.individuService.chargeLogedUserInfo().pipe(
      concatMap(data => {
          this.individu = data;
          return this.userBusinessRelationService.findUserBusinessRelationByUserEmail(this.individu.email);
        },
      )).subscribe(
      data => {
        this.myUserBusinessRelationList = data.filter(ubr => ubr.role == UserBusinessRole.MEMBER);
        if (this.myUserBusinessRelationList.length === 1) {
          this.selectedUserBusinessRelation = this.myUserBusinessRelationList[0];
          this.loadData();
        } else if (this.myUserBusinessRelationList.length > 1) {
          const distinctBusiness: Set<Business> = new Set<Business>();
          this.myUserBusinessRelationList.forEach(b => {
            if (!distinctBusiness.has(b.business)) {
              distinctBusiness.add(b.business);
              this.myUserBusinessRelationList.push(b);
            }
          });
        }
      }
    );
  }

  loadData() {
    this.individuService.chargeLogedUserInfo().pipe(
      concatMap(
        data => {
          if (data) {
            this.individu = data;
            this.buildActualWeeks();
            return this.scheduleServiceApi.findProjectsByBusinessId(this.selectedUserBusinessRelation.business.id);
          }
        },
      )
    ).subscribe(
      data => {
        this.projectList = data;
        this.initPreviousAndNextWeeks();
      }
    );
  }

  saveSchedules() {
    this.scheduleServiceApi.saveSchedules(this.preloadedWeeks.actualWeek).subscribe(
      data => {
        this.preloadedWeeks.actualWeek = data;
        this.openDialog('Sauvegarde réalisée avec succès', DialogType.SUCCESS);
      },
      error => {
        this.openDialog('Une erreur c\'est produite lors da la sauvgarde du planning', DialogType.ERROR);
      }
    );
  }

  openDialog(msg: string, type: DialogType): void {
    let dialogInformation = this.buildConfirmationDialog(msg, type);
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      minWidth: '20em', width: '35%'
    });
    dialogRef.componentInstance.dialogInfo = dialogInformation;
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  buildConfirmationDialog(msg: string, type: DialogType): DialogInformation {
    let dialogInfo = new DialogInformation();
    dialogInfo.titre = this.WORDING.dialog.title.confirm;
    dialogInfo.dialogType = type;
    dialogInfo.message1 = msg;
    dialogInfo.noLbl = this.WORDING.dialog.button.close;
    return dialogInfo;
  }

  updateSelectedDay(index: number) {
    this.selectedDayIndex = index;
  }

  addProjectToActivity(p: Project, duration: number) {
    if(this.isFree(this.preloadedWeeks.actualWeek[this.selectedDayIndex])){
      return;
    }
    let totalActivitiesDuration: number = 0;
    this.preloadedWeeks.actualWeek[this.selectedDayIndex].activities.forEach(a => {
      totalActivitiesDuration += a.duration;
    });
    if (totalActivitiesDuration + duration > 8) {
      return;
    }
    let activity = this.preloadedWeeks.actualWeek[this.selectedDayIndex].activities.filter(
      a => {
        return a.project.id === p.id;
      }
    );

    if (isNullOrUndefined(activity) || activity.length == 0) {
      let activity = new Activity(null, p, duration, 'comment');
      this.preloadedWeeks.actualWeek[this.selectedDayIndex].activities.push(activity);
    } else {
      activity[0].duration = activity[0].duration + duration;
    }
    this.switchToNextColumnifFull(totalActivitiesDuration + duration);
  }

  switchToNextColumnifFull(projectDuration: number) {
    if (projectDuration >= 8 && this.selectedDayIndex < 6) {
      this.verifyNext();
    }
  }

  verifyNext(){
    let counter: number = this.selectedDayIndex+1;
    while (this.isFree(this.preloadedWeeks.actualWeek[counter])){
      if(counter < 6){
        counter++;
      }else {
        counter = this.selectedDayIndex;
      }
    }
    this.selectedDayIndex = counter;
  }

  removeDayActivity(index: number) {
    this.preloadedWeeks.actualWeek[index].activities = [];
  }


  buildActualWeeks() {
    this.retrieveSchedules(new Date(), this.preloadedWeeks.actualWeek);
  }

  initPreviousAndNextWeeks() {
    var firstDayOfWeekDateToDisplay = new Date(this.getFirstDayOfActualWeek(new Date()).getTime() + 7 * ONE_DAY);
    this.retrieveSchedules(firstDayOfWeekDateToDisplay, this.preloadedWeeks.nextWeek);
    var firstDayOfPreviousWeek = new Date(this.getFirstDayOfActualWeek(new Date()).getTime() - ONE_DAY);
    this.retrieveSchedules(firstDayOfPreviousWeek, this.preloadedWeeks.previousWeek);
  }

  canDisplayNextBtn(): boolean {
    return !isNullOrUndefined(this.preloadedWeeks.nextWeek) && this.preloadedWeeks.nextWeek.length == 7;
  }

  canDisplayPreviousBtn(): boolean {
    return !isNullOrUndefined(this.preloadedWeeks.previousWeek) && this.preloadedWeeks.previousWeek.length == 7;
  }

  canDisplaySaveBtn(): boolean {
    return !isNullOrUndefined(this.preloadedWeeks.actualWeek) && this.preloadedWeeks.actualWeek.length == 7;
  }

  buildNextWeek() {
    this.selectedDayIndex = 0;
    this.preloadedWeeks.previousWeek = [...this.preloadedWeeks.actualWeek];
    this.preloadedWeeks.actualWeek = [...this.preloadedWeeks.nextWeek];
    var firstDayOfWeekDateToDisplay = new Date(new Date(this.preloadedWeeks.actualWeek[0].planningDate).getTime() + 7 * ONE_DAY);
    this.preloadedWeeks.nextWeek = [];
    this.retrieveSchedules(firstDayOfWeekDateToDisplay, this.preloadedWeeks.nextWeek);
  }

  buildPreviousWeek() {
    this.selectedDayIndex = 0;
    this.preloadedWeeks.nextWeek = [...this.preloadedWeeks.actualWeek];
    this.preloadedWeeks.actualWeek = [...this.preloadedWeeks.previousWeek];
    var firstDayOfPreviousWeek = new Date(new Date(this.preloadedWeeks.actualWeek[0].planningDate).getTime() - ONE_DAY);
    this.preloadedWeeks.previousWeek = [];
    this.retrieveSchedules(firstDayOfPreviousWeek, this.preloadedWeeks.previousWeek);
  }

  getFirstDayOfActualWeek(d: Date): Date {

    let firstDay: Date;
    const date = new Date(d);
    const day = date.getDay(); // 👉️ get day of week
    // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }

  getLastDayOfWeek(d: Date): Date {

    let firstDay: Date = this.getFirstDayOfActualWeek(d);
    let lastDay = new Date(firstDay);
    lastDay.setDate(lastDay.getDate() + 6);
    return lastDay;

  }

  retrieveSchedules(d: Date, cible: Schedule[]) {
    let firstDay: Date = this.getFirstDayOfActualWeek(d);
    let lastDay: Date = this.getLastDayOfWeek(d);
    let period = new Period(firstDay, lastDay);
    this.scheduleServiceApi.findDailyPlanningByPeriod(this.selectedUserBusinessRelation.id, period).subscribe(
      data => {
        this.buildWeek(data, firstDay, lastDay, cible);
      }
    );
  }

  buildWeek(schedules: Schedule[], first: Date, last: Date, cible: Schedule[]) {

    let week: Schedule[] = [];
    let dateIterator: Date = first;
    this.scheduleServiceApi.getHolidays(this.datepipe.transform(first, 'yyyy-MM-dd'), this.datepipe.transform(last, 'yyyy-MM-dd')).subscribe(
      data => {
        for (let i = 0; i <= 6; i++) {
          let newSchedule = new Schedule(null, dateIterator, this.selectedUserBusinessRelation.id, [], this.isHoliday(data, dateIterator));
          if (schedules && schedules.length > 0) {
            let actualSchedule = schedules.filter(s => this.datepipe.transform(s.planningDate, 'yyyy/MM/dd') == this.datepipe.transform(dateIterator, 'yyyy/MM/dd'));
            if (actualSchedule && actualSchedule.length > 0) {
              newSchedule = actualSchedule[0];
              newSchedule.planningDate = dateIterator;
            }else{
              this.displayMsg = true;
            }
          }
          week.push(newSchedule);
          dateIterator = new Date(new Date(week[i].planningDate).setDate(week[i].planningDate.getDate() + 1));
        }
        cible.push(...week);
      }
    )
  }

  isHoliday(holidays: Holiday[], date: Date): boolean{

    return holidays.some(h => {
      const d = new Date(h.date);
      return this.areDatesEqual(d, date);})
  }

  areDatesEqual(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  isFree(schedule: Schedule ): boolean {
    const planningDate = new Date(schedule.planningDate);
    return this.weekend.includes(this.days[planningDate.getDay()])
      || schedule.holiday;
  }

  selectBusiness(item: UserBusinessRelation) {
    this.selectedUserBusinessRelation = item;
    this.loadData();
  }
}
