import {Activity} from './activity';

export class Schedule {

  id: number;
  planningDate: Date;
  relationId: number;
  isFree: boolean;
  activities: Activity[];
  holiday: boolean;

  constructor(id: number, planningDate: Date, relationId: number, activities: Activity[], holiday: boolean) {
    this.id = id;
    this.planningDate = planningDate;
    this.relationId = relationId;
    this.activities = activities;
    this.holiday = holiday;
  }
}
