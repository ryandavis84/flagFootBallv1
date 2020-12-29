import { IEmergencyContact } from 'app/shared/model/emergency-contact.model';
import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ITeam } from 'app/shared/model/team.model';

export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  grade?: number;
  age?: number;
  emergencyContact?: IEmergencyContact;
  contactInfo?: IContactInfo;
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
    public emergencyContact?: IEmergencyContact,
    public contactInfo?: IContactInfo,
    public team?: ITeam
  ) {}
}
