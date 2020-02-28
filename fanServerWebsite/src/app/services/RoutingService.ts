import {User} from "../models/User";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private users: User[];

  constructor() {
    this.users = [];
    this.users.push(new User("0", "Zuiia#1234", "Jonsch", "https://cdn.discordapp.com/avatars/188968706162819075/a_e5c844bf9997ca0590416fac0b9a237e"));
    this.users.push(new User("1", "Alatariel#2933", "Cansch", "https://cdn.discordapp.com/avatars/188968706162819075/a_e5c844bf9997ca0590416fac0b9a237e"));
  }

  // provisional. Laterr API call
  public getUserPicture (id: string): string {
    return this.users.find(user => user.id == id).picture;
  }

  // username with descriminator

  // provisional. Laterr API call
  public getUserTag (id: string): string {
    return this.users.find(user => user.id == id).tag;
  }

  // provisional. Laterr API call
  public getUserUsername (id: string): string {
    return this.users.find(user => user.id == id).username;
  }
}
