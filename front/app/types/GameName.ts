import { Item } from "./item";

export class GameName implements Item {
  public "@id"?: string;

  constructor(
    _id: string,
    public id: string,
    public name: string,
  ) {
    this["@id"] = _id;
  }
}