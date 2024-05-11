import { Item } from "./item";

export class Tavern implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public website?: string,
    public phone?: string,
    public address?: any
  ) {
    this["@id"] = _id;
  }
}
