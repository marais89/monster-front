import {Schedule} from './schedule';

export class WeeksPlanning {

  nextWeek: Schedule[];
  actualWeek: Schedule[];
  previousWeek: Schedule[];

  constructor(next: Schedule[], actual: Schedule[], previous: Schedule[]) {
    this.nextWeek = next;
    this.actualWeek = actual;
    this.previousWeek = previous;

  }


}
