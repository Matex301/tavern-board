import { Item } from "./item";
import { Address } from "./Tavern";

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