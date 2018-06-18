import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { HnStoriesService } from "../hn-stories.service";
import { Story } from "../story";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.css"]
})
export class StoryComponent implements OnInit, OnDestroy {
  @Input() sid: number;
  story: Story;
  ready: boolean = false;
  constructor(private hnService: HnStoriesService) {}

  ngOnInit() {
    this.showStory();
  }

  showStory() {
    this.hnService.getStory(this.sid).subscribe((data: Story) => {
      this.story = { ...data };
      this.ready = true;
    });
  }
}
