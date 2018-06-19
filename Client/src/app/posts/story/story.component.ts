import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { HnStoriesService } from "../hn-stories.service";
import { Story } from "../story";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html"
})
export class StoryComponent implements OnInit, OnDestroy {
  @Input() sid: number;
  story: Story;
  ready: boolean = false;
  subscription;
  comments: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    undefined
  );
  collapseComments: boolean = true;

  constructor(private hnService: HnStoriesService) {}

  ngOnInit() {
    this.showStory();
  }

  showStory() {
    this.subscription = this.hnService
      .getStory(this.sid)
      .subscribe((data: Story) => {
        this.story = { ...data };
        this.ready = true;
      });
  }

  toggleComments() {
    if (this.comments === undefined) {
      this.comments.next(this.story.kids);
    }
    this.collapseComments = !this.collapseComments;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
