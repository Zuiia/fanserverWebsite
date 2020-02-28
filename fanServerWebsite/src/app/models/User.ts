// provisional user file, can be deleted later. Only important for neanderthal review testing

export class User {
  id: string;
  tag: string;
  username: string;
  picture: string;


  constructor(id: string, tag: string, username: string, picture: string) {
    this.id = id;
    this.tag = tag;
    this.username = username;
    this.picture = picture;
  }
}
