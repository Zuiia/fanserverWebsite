export class Review {
  private _id: string;
  private _userid: string;
  private _title: string;
  private _description: string;
  private _created_at: Date;
  private _stars: number;

  private _tag: string;
  private _username: string;
  private _picture: string;

  constructor(userid: string, title: string, description: string, created_at: Date, stars: number) {
    this._userid = userid;
    this._title = title;
    this._description = description;
    this._created_at = created_at;
    this._stars = stars;
  }


  setId(value: string) {
    this._id = value;
  }

  getId(): string {
    return this._id;
  }


  get userid(): string {
    return this._userid;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get stars(): number {
    return this._stars;
  }


  get tag(): string {
    return this._tag;
  }

  set tag(value: string) {
    this._tag = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }
}
