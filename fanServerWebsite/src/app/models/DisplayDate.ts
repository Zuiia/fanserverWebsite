export class DisplayDate {
  private date: Date;
  private milliseconds: number;

  constructor(milliseconds: number) {
    this.date = new Date(milliseconds);
    this.milliseconds = milliseconds;
  }

  getDisplayDate(): string {
    let now: Date = new Date();
    if (this.milliseconds < (Date.parse(now.toString()) + (1000 * 60 * 60 * 24))) {
      return "Yesterday";
    }
    if (this.milliseconds < (Date.parse(now.toString()) + (1000 * 60 * 60 * 24 * 7))) {
      return "A few days ago";
    }
    if (this.milliseconds < (Date.parse(now.toString()) + (1000 * 60 * 60 * 24 * 14))) {
      return "One week ago";
    }
    if (this.milliseconds < (Date.parse(now.toString()) + (1000 * 60 * 60 * 24 * 30))) {
      return "A few weeks ago";
    }
    if (this.milliseconds < (Date.parse(now.toString()) + (1000 * 60 * 60 * 24 * 32))) {
      return "A month ago";
    }
    else {
      return this.date.toDateString();
    }
  }
}
