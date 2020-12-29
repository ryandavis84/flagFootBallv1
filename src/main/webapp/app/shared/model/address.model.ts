export interface IAddress {
  id?: number;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  phoneNumber?: string;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public street1?: string,
    public street2?: string,
    public city?: string,
    public state?: string,
    public phoneNumber?: string
  ) {}
}
