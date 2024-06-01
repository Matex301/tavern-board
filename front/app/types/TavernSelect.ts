import { Item } from "./item";

export interface Address {
  street: string,
  city: string,
  country: string
}

export class TavernSelect implements Item {
  public "@id": string;

  constructor(
    _id: string,
    public id: string,
    public name: string,
    public address: Address
  ) {
    this["@id"] = _id;
  }
}