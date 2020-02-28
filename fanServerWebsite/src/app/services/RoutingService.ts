import {User} from "../models/User";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private users: User[];

  constructor() {
    this.users = [];
    this.users.push(new User("0", "Zuiia#1234", "Jonsch", "../../assets/pictures/Jonsch.jpg"));
    this.users.push(new User("1", "Alatariel#2933", "Cansch", "../../assets/pictures/Cansch.jpg"));
  }

  // provisional. Laterr API call
  public getUserPicture (id: string): string {
    return this.users.find(user => user.id == id).picture;
  }

  // provisional. Laterr API call
  public getUserTag (id: string): string {
    return this.users.find(user => user.id == id).tag;
  }

  // provisional. Laterr API call
  public getUserUsername (id: string): string {
    return this.users.find(user => user.id == id).username;
  }
}
