import { IPlayer } from 'app/shared/model/player.model';
import { ICoach } from 'app/shared/model/coach.model';
import { ILeague } from 'app/shared/model/league.model';
import { ISeason } from 'app/shared/model/season.model';

export interface ITeam {
  id?: number;
  name?: string;
  playerIds?: IPlayer[];
  coach?: ICoach;
  league?: ILeague;
  season?: ISeason;
}

export class Team implements ITeam {
  constructor(
    public id?: number,
    public name?: string,
    public playerIds?: IPlayer[],
    public coach?: ICoach,
    public league?: ILeague,
    public season?: ISeason
  ) {}
}
