import { Component, OnInit } from "@angular/core";
import { HnStoriesService } from "../posts/hn-stories.service";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  stories: number[];
  pagedStories: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  items: number = 15;
  maxPages: number;
  finished: boolean = false;
  currentPage: number = 1;

  constructor(private hnService: HnStoriesService) {}

  ngOnInit() {
    this.getTopStories();
  }

  getTopStories() {
    this.hnService.getTopStories().subscribe(data => {
      let top = data as number[];
      this.stories = top;
      this.maxPages = Math.floor(this.stories.length / this.items);
      this.pagedStories.next(this.getPage(this.currentPage));
    });
  }

  getPage(i: number) {
    return this.stories.slice((i - 1) * this.items, i * this.items);
  }

  getStories() {
    if (this.pagedStories.value.length == this.stories.length) {
      this.finished = true;
    } else {
      this.pagedStories.next(
        _.concat(this.pagedStories.value, this.getPage(this.currentPage))
      );
    }
  }

  onScroll() {
    this.currentPage++;
    this.getStories();
  }
}
