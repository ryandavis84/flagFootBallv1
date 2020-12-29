import { IContactInfo } from 'app/shared/model/contact-info.model';

export interface IAddress {
  id?: number;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  id?: IContactInfo;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public street1?: string,
    public street2?: string,
    public city?: string,
    public state?: string,
    public id?: IContactInfo
  ) {}
}
