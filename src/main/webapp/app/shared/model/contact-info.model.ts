import { IPlayer } from 'app/shared/model/player.model';
import { IAddress } from 'app/shared/model/address.model';

export interface IContactInfo {
  id?: number;
  id?: IPlayer;
  id?: IAddress;
}

export class ContactInfo implements IContactInfo {
  constructor(public id?: number, public id?: IPlayer, public id?: IAddress) {}
}
