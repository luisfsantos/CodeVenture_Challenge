import { Component, OnInit, Input } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html"
})
export class CommentsComponent implements OnInit {
  private _comments: number[];
  activeComments: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  items: number = 5;
  maxComments: number;
  finished: boolean = false;
  currentComments: number = 0;

  constructor() {}

  ngOnInit() {}

  @Input()
  set comments(comments: number[]) {
    this._comments = comments;
    this.getTopComments();
  }

  getTopComments() {
    this.maxComments = Math.floor(this._comments.length / this.items);
    this.loadMoreComments();
  }

  loadMoreComments() {
    if (this.currentComments < this.maxComments) {
      this.currentComments++;
      this.activeComments.next(
        _.concat(
          this.activeComments.value,
          _.slice(
            this._comments,
            (this.currentComments - 1) * this.items,
            this.currentComments * this.items
          )
        )
      );
    }
  }
}
