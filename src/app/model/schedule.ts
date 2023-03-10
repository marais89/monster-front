import {Activity} from './activity';

export class Schedule {

  id: number;
  planningDate: Date;
  userId: number;
  isFree: boolean;
  activities: Activity[];

  constructor(id: number, planningDate: Date, userId: number, activities: Activity[]) {
    this.id = id;
    this.planningDate = planningDate;
    this.userId = userId;
    this.activities = activities;
  }
}
