import { ILeague } from 'app/shared/model/league.model';

export interface ISeason {
  id?: number;
  name?: string;
  leagues?: ILeague[];
}

export class Season implements ISeason {
  constructor(public id?: number, public name?: string, public leagues?: ILeague[]) {}
}
