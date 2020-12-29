import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ITeam } from 'app/shared/model/team.model';
import { JerseySize } from 'app/shared/model/enumerations/jersey-size.model';

export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  grade?: number;
  age?: number;
  jerseySize?: JerseySize;
  contactInfo?: IContactInfo;
  team?: ITeam;
  team?: ITeam;
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
    public contactInfo?: IContactInfo,
    public team?: ITeam,
    public team?: ITeam
  ) {}
}
