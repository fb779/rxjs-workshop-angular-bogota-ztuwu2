import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GiphyService } from './giphy.service';
import { Gif } from './giphy.model';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css'],
})
export class GiphyComponent {
  // searchTerm: string = DEFAULT_SEARCH_TERM;
  //limit: number = DEFAULT_SEARCH_LIMIT;
  searchTerm$: Observable<string> = this.giphyService.searchTerm$;
  limit$: Observable<number> = this.giphyService.limit$;
  gifs$: Observable<Gif[]> = this.giphyService.gifs$;
  totalResults$: Observable<number> = this.giphyService.totalResults$;
  totalPages$: Observable<number> = this.giphyService.totalPages$;
  actualPage$: Observable<number> = this.giphyService.actualPage$;
  firstPage$: Observable<boolean> = this.giphyService.firstPage$;
  lastPage$: Observable<boolean> = this.giphyService.lastPage$;

  constructor(private giphyService: GiphyService) {}

  movePage(num: number) {
    this.giphyService.movePage(num);
  }

  limitChange(num: number) {
    this.giphyService.limitChange(num);
  }

  searchChange(term: string) {
    this.giphyService.searchTerm(term);
  }
}
