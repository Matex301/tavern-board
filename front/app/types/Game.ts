import { Item } from "./item";

export class Game implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public name?: string,
    public description?: string,
    public image?: string,
    public minPlayers?: number,
    public maxPlayer?: number
  ) {
    this["@id"] = _id;
  }
}
