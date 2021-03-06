import { IPlayer } from 'app/shared/model/player.model';
import { ITeam } from 'app/shared/model/team.model';
import { ISeason } from 'app/shared/model/season.model';

export interface ILeague {
  id?: number;
  name?: string;
  playerIds?: IPlayer[];
  teamIds?: ITeam[];
  season?: ISeason;
}

export class League implements ILeague {
  constructor(public id?: number, public name?: string, public playerIds?: IPlayer[], public teamIds?: ITeam[], public season?: ISeason) {}
}
