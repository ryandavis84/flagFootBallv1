import { IPlayer } from 'app/shared/model/player.model';
import { IAddress } from 'app/shared/model/address.model';

export interface IContactInfo {
  id?: number;
  player?: IPlayer;
  address?: IAddress;
}

export class ContactInfo implements IContactInfo {
  constructor(public id?: number, public player?: IPlayer, public address?: IAddress) {}
}
