import {Business} from './business';

//TODO move to his own .ts file
export class BusinesGroup {
  id: number;

  name: string;

  idBusiness: number;

  active: boolean;
}

export class UserBusinessRelation {
  id: number;

  individuId: number;

  business: Business;

  businessGroup: BusinesGroup;

  role: UserBusinessRole;

  status: UserBusinessStatus;
};

export enum UserBusinessRole {

  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

export enum UserBusinessStatus {

  ACTIF = 'ACTIF',
  SUSPENDED = 'SUSPENDED',
  DISABLE = 'DISABLE'
}
