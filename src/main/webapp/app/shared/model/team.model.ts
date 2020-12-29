import { IPlayer } from 'app/shared/model/player.model';
import { ICoach } from 'app/shared/model/coach.model';
import { ILeague } from 'app/shared/model/league.model';

export interface ITeam {
  id?: number;
  name?: string;
  ids?: IPlayer[];
  id?: ICoach;
  ids?: ILeague[];
}

export class Team implements ITeam {
  constructor(public id?: number, public name?: string, public ids?: IPlayer[], public id?: ICoach, public ids?: ILeague[]) {}
}
