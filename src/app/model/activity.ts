import {Project} from './project';

export class Activity {

  id: number;
  project: Project;
  duration: number;
  comment: string;

  constructor(activityId: number, project: Project, duration: number, comment: string) {
    this.id = activityId;
    this.project = project;
    this.duration = duration;
    this.comment = comment;
  }
}
