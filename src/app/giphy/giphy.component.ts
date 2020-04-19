import { Component } from "@angular/core";
import { GiphyService } from "./giphy.service";
import {
  API_SEARCH_URL,
  DEFAULT_SEARCH_TERM,
  API_KEY,
  DEFAULT_SEARCH_LIMIT
} from "./giphy.config";
import { Gif, GiphyResponse } from "./giphy.model";

@Component({
  selector: "app-giphy",
  templateUrl: "./giphy.component.html",
  styleUrls: ["./giphy.component.css"]
})
export class GiphyComponent {
  gifs: Gif[];
  searchTerm: string = DEFAULT_SEARCH_TERM;
  limit: number = DEFAULT_SEARCH_LIMIT;

  constructor(private giphyService: GiphyService) {
    this.giphyService.giphyResponse$.subscribe(
      (response: GiphyResponse) => (this.gifs = response.data)
    );
  }
}
