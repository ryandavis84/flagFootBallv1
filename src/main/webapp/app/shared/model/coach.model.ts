import { ITeam } from 'app/shared/model/team.model';
import { IEmergencyContact } from 'app/shared/model/emergency-contact.model';
import { JerseySize } from 'app/shared/model/enumerations/jersey-size.model';

export interface ICoach {
  id?: number;
  firstName?: string;
  lastName?: string;
  jerseySize?: JerseySize;
  teams?: ITeam[];
  emergencyContact?: IEmergencyContact;
}

export class Coach implements ICoach {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public jerseySize?: JerseySize,
    public teams?: ITeam[],
    public emergencyContact?: IEmergencyContact
  ) {}
}
