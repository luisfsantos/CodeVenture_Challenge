import { Component, Input, OnInit } from "@angular/core";
import { HnStoriesService } from "../hn-stories.service";
import { Comment } from "../comment";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-single-comment",
  templateUrl: "./comment.component.html"
})
export class CommentComponent implements OnInit {
  @Input() cid: number;
  private _subscription;
  comment: Comment;
  ready: boolean = false;
  subComments: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    undefined
  );
  collapseComments: boolean = true;

  constructor(private hnService: HnStoriesService) {}

  ngOnInit() {
    this.showComment();
  }

  showComment() {
    this._subscription = this.hnService
      .getComment(this.cid)
      .subscribe((data: Comment) => {
        this.comment = { ...data };
        this.ready = true;
      });
  }

  toggleChildren() {
    if (this.subComments.value === undefined) {
      this.subComments.next(this.comment.kids);
    }
    this.collapseComments = !this.collapseComments;
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
