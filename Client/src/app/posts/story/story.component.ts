import { Component, OnInit, Input } from '@angular/core';
import { HnStoriesService } from '../hn-stories.service';
import { Story } from '../story';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() sid: number;
  story: Story;
  constructor(private hnService:HnStoriesService) {
   }

  ngOnInit() {
    this.showStory();
  }

  showStory() {
    this.hnService.getStory(this.sid)
      .subscribe((data : Story) => {
        this.story = { ...data }
    });
  }



}
