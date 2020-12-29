import { IEmergencyContact } from 'app/shared/model/emergency-contact.model';
import { ITeam } from 'app/shared/model/team.model';
import { JerseySize } from 'app/shared/model/enumerations/jersey-size.model';

export interface ICoach {
  id?: number;
  firstName?: string;
  lastName?: string;
  jerseySize?: JerseySize;
  emergencyContact?: IEmergencyContact;
  team?: ITeam;
}

export class Coach implements ICoach {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public jerseySize?: JerseySize,
    public emergencyContact?: IEmergencyContact,
    public team?: ITeam
  ) {}
}
