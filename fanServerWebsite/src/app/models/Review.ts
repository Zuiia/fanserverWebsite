export class Review {
  private _id: number;
  private _userid: string;
   _title: string;
   _description: string;
   _created_at_display: string;
   _created_at: Date;
   _stars: number;

   _tag: string;
   _username: string;
   _picture: string;

  private milliseconds: number;

  constructor(userid: string, title: string, description: string, created_at: Date, stars: number,
              tag?: string, picture?: string) {
    this._userid = userid;
    this._title = title;
    this._description = description;
    this._created_at = created_at;
    this._stars = stars;
    this._tag = tag;
    this._picture = picture;
    this.milliseconds = Number(created_at.toString());
    this._created_at_display = this.getDisplayDate();

  }


  setId(value: number) {
    this._id = value;
  }

  getId(): number {
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


  get created_at_display(): string {
    return this._created_at_display;
  }

  set created_at_display(value: string) {
    this._created_at_display = value;
  }

  getDisplayDate(): string {
    let now: Date = new Date();
    if (this.milliseconds + (1000 * 60 * 60 * 24) > (Date.parse(now.toString()))) {
      return "Yesterday";
    }
    if (this.milliseconds + (1000 * 60 * 60 * 24 * 7) > (Date.parse(now.toString()))) {
      return "A few days ago";
    }
    if (this.milliseconds + (1000 * 60 * 60 * 24 * 14) > (Date.parse(now.toString()))) {
      return "One week ago";
    }
    if (this.milliseconds + (1000 * 60 * 60 * 24 * 30) > (Date.parse(now.toString()))) {
      return "A few weeks ago";
    }
    if (this.milliseconds + (1000 * 60 * 60 * 24 * 32) > (Date.parse(now.toString()))) {
      return "A month ago";
    } else {
      return this._created_at.toDateString();
    }
  }
}
