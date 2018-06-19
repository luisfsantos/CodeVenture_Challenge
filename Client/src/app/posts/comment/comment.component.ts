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
  comment: Comment;
  ready: boolean = false;
  subComments: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  subscription;

  constructor(private hnService: HnStoriesService) {}

  ngOnInit() {
    this.showComment();
  }

  showComment() {
    this.subscription = this.hnService
      .getComment(this.cid)
      .subscribe((data: Comment) => {
        this.comment = { ...data };
        this.ready = true;
      });
  }

  showChildren() {
    this.subComments.next(this.comment.kids);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
