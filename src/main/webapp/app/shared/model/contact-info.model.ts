import { IAddress } from 'app/shared/model/address.model';
import { ContactType } from 'app/shared/model/enumerations/contact-type.model';

export interface IContactInfo {
  id?: number;
  type?: ContactType;
  addressId?: IAddress;
}

export class ContactInfo implements IContactInfo {
  constructor(public id?: number, public type?: ContactType, public addressId?: IAddress) {}
}
