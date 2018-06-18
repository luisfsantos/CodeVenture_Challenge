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
  comments: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

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

  showComments() {
    this.comments.next(this.story.kids);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
