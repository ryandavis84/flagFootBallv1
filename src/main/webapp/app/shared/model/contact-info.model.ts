import { IAddress } from 'app/shared/model/address.model';
import { IPlayer } from 'app/shared/model/player.model';
import { ICoach } from 'app/shared/model/coach.model';
import { ContactType } from 'app/shared/model/enumerations/contact-type.model';

export interface IContactInfo {
  id?: number;
  type?: ContactType;
  id?: IAddress;
  emergencyContact?: IPlayer;
  emergencyContact?: ICoach;
  personalContact?: IPlayer;
  personalContact?: ICoach;
}

export class ContactInfo implements IContactInfo {
  constructor(
    public id?: number,
    public type?: ContactType,
    public id?: IAddress,
    public emergencyContact?: IPlayer,
    public emergencyContact?: ICoach,
    public personalContact?: IPlayer,
    public personalContact?: ICoach
  ) {}
}
