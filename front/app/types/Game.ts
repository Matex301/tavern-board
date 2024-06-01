import { Item } from "./item";
import { getUserId, hasRole } from "../api-actions/login-client";

export class Game implements Item {
  public "@id"?: string;

  constructor(
    _id: string,
    public id: string,
    public name: string,
    public description: string,
    public image?: string,
    public minPlayers?: number,
    public maxPlayer?: number
  ) {
    this["@id"] = _id;
  }

  public isEditable() {
    return hasRole('ROLE_ADMIN');
  }
}
