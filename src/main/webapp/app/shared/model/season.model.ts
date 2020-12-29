import { ILeague } from 'app/shared/model/league.model';

export interface ISeason {
  id?: number;
  name?: string;
  ids?: ILeague[];
}

export class Season implements ISeason {
  constructor(public id?: number, public name?: string, public ids?: ILeague[]) {}
}
