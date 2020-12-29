import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ITeam } from 'app/shared/model/team.model';
import { ILeague } from 'app/shared/model/league.model';
import { ISeason } from 'app/shared/model/season.model';
import { JerseySize } from 'app/shared/model/enumerations/jersey-size.model';

export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  grade?: number;
  age?: number;
  jerseySize?: JerseySize;
  id?: IContactInfo;
  id?: IContactInfo;
  team?: ITeam;
  league?: ILeague;
  season?: ISeason;
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public dob?: string,
    public grade?: number,
    public age?: number,
    public jerseySize?: JerseySize,
    public id?: IContactInfo,
    public id?: IContactInfo,
    public team?: ITeam,
    public league?: ILeague,
    public season?: ISeason
  ) {}
}
