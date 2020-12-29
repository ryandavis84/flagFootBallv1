import { IAddress } from 'app/shared/model/address.model';

export interface IContactInfo {
  id?: number;
  address?: IAddress;
}

export class ContactInfo implements IContactInfo {
  constructor(public id?: number, public address?: IAddress) {}
}
