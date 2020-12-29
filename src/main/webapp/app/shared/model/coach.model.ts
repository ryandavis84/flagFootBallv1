import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ITeam } from 'app/shared/model/team.model';
import { JerseySize } from 'app/shared/model/enumerations/jersey-size.model';

export interface ICoach {
  id?: number;
  firstName?: string;
  lastName?: string;
  jerseySize?: JerseySize;
  id?: IContactInfo;
  id?: IContactInfo;
  teamIds?: ITeam[];
}

export class Coach implements ICoach {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public jerseySize?: JerseySize,
    public id?: IContactInfo,
    public id?: IContactInfo,
    public teamIds?: ITeam[]
  ) {}
}
