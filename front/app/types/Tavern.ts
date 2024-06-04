import { Item } from "./item";

export interface Address {
  street: string,
  city: string,
  country: string,
  latitude: number,
  longitude: number,
}

export class Tavern implements Item {
  public "@id"?: string;

  constructor(
    _id: string,
    public id: string,
    public name: string,
    public website: string,
    public phone: string,
    public address: Address
  ) {
    this["@id"] = _id;
  }
}
