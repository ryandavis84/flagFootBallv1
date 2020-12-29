import { ITeam } from 'app/shared/model/team.model';
import { ISeason } from 'app/shared/model/season.model';

export interface ILeague {
  id?: number;
  name?: string;
  ids?: ITeam[];
  ids?: ISeason[];
}

export class League implements ILeague {
  constructor(public id?: number, public name?: string, public ids?: ITeam[], public ids?: ISeason[]) {}
}
