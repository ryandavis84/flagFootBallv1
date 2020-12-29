import { IPlayer } from 'app/shared/model/player.model';
import { ILeague } from 'app/shared/model/league.model';

export interface ITeam {
  id?: number;
  name?: string;
  players?: IPlayer[];
  league?: ILeague;
}

export class Team implements ITeam {
  constructor(public id?: number, public name?: string, public players?: IPlayer[], public league?: ILeague) {}
}
