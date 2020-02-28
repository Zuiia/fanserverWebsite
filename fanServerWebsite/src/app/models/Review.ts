export class Review {
  private _id: number;
  private userid: string;
  private title: string;
  private description: string;
  private created_at: Date;
  private stars: number;


  constructor(userid: string, title: string, description: string, created_at: Date, stars: number) {
    this.userid = userid;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.stars = stars;
  }


  setId(value: number) {
    this._id = value;
  }

  getId(): number {
    return this._id;
  }
}
