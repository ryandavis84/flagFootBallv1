import { IPlayer } from 'app/shared/model/player.model';

export interface IContactInfo {
  id?: number;
  player?: IPlayer;
}

export class ContactInfo implements IContactInfo {
  constructor(public id?: number, public player?: IPlayer) {}
}
