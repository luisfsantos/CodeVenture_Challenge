import { Component, Input, OnInit } from "@angular/core";
import { HnStoriesService } from "../hn-stories.service";
import { Comment } from "../comment";

@Component({
  selector: "app-single-comment",
  templateUrl: "./comment.component.html"
})
export class CommentComponent implements OnInit {
  @Input() cid: number;
  comment: Comment;
  ready: boolean = false;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
