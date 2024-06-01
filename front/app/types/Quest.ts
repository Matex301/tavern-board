import { Item } from "./item";
import { getUserId, hasRole } from "../api-actions/login-client";

export class Quest implements Item {
  public "@id"?: string;

  constructor(
    _id: string,
    public id: string,
    public title: string,
    public description: string,
    public startAt: Date,
    public game: any,
    public tavern: any,
    public creator: any,
    public currentPlayers: number,
    public players: Array<any>,

    public image?: string,
    public maxPlayers?: number,
    public endAt?: Date,
  ) {
    this["@id"] = _id;
  }

  public isCreator() {
    let user = getUserId();
    if(!user)
      return false;

    if(user === this.creator.id)
      return true;
    return false;
  }

  public isPlayer() {
    let user = getUserId();
    if(!user)
      return false;
    
    if(this.players.some((obj) => {return obj.id === user}))
      return true;
    return false;
  }

  public isEditable() {
    return hasRole('ROLE_ADMIN') || this.isCreator();
  }
}
