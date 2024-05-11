import { Item } from "./item";

export class User implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public username?: string,
    public email?: string,
    public banned?: boolean,
    public createdAt?: Date,
    public verified?: boolean
  ) {
    this["@id"] = _id;
  }
}
