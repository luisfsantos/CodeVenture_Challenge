import { Component, OnInit } from '@angular/core';
import { HnStoriesService } from '../posts/hn-stories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  stories: number[];
  constructor(private hnService: HnStoriesService) { }

  ngOnInit() {
    this.getTopStories();
  }

  getTopStories() {
    this.hnService.getTopStories()
      .subscribe(data => {
        let top = data as number[];
        this.stories = top.slice(1, 30);
    });
  }

}
