import { Item } from "./item";

export class Quest implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public id?: string,
    public title?: string,
    public description?: string,
    public image?: string,
    public maxPlayers?: number,
    public startAt?: Date,
    public endAt?: Date,
    public game?: any,
    public tavern?: any,
    public creator?: any,
    public currentPlayers?: number
  ) {
    this["@id"] = _id;
  }
}
