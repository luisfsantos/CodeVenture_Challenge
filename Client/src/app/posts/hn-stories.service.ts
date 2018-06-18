import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Story } from "./story";

const TOPSTORIES =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

@Injectable({
  providedIn: "root"
})
export class HnStoriesService {
  constructor(private http: HttpClient) {}

  getTopStories() {
    return this.http.get(TOPSTORIES);
  }

  getStory(id: number) {
    var storyUrl =
      "https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty";
    return this.http.get<Story>(storyUrl);
  }
}
