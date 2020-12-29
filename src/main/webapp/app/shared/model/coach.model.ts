import { ITeam } from 'app/shared/model/team.model';
import { IContactInfo } from 'app/shared/model/contact-info.model';
import { JerseySize } from 'app/shared/model/enumerations/jersey-size.model';

export interface ICoach {
  id?: number;
  firstName?: string;
  lastName?: string;
  jerseySize?: JerseySize;
  team?: ITeam;
  contactInfo?: IContactInfo;
}

export class Coach implements ICoach {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public jerseySize?: JerseySize,
    public team?: ITeam,
    public contactInfo?: IContactInfo
  ) {}
}
