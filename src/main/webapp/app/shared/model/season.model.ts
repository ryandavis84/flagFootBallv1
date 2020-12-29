import { IPlayer } from 'app/shared/model/player.model';
import { ITeam } from 'app/shared/model/team.model';
import { ILeague } from 'app/shared/model/league.model';

export interface ISeason {
  id?: number;
  name?: string;
  playerIds?: IPlayer[];
  teamIds?: ITeam[];
  leagueIds?: ILeague[];
}

export class Season implements ISeason {
  constructor(
    public id?: number,
    public name?: string,
    public playerIds?: IPlayer[],
    public teamIds?: ITeam[],
    public leagueIds?: ILeague[]
  ) {}
}
