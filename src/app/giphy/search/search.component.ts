import { Component, Input, Output, EventEmitter } from "@angular/core";
import { LIMITS } from "../giphy.config";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {
  @Input() searchTerm: string;
  @Input() limit: string;
  @Input() firstPage: boolean;
  @Input() lastPage: boolean;
  @Input() totalResults: number;
  @Input() actualPage: number;
  @Input() totalPages: number;
  @Output() limitChange = new EventEmitter();
  @Output() movePage = new EventEmitter();
  @Output() searchChange = new EventEmitter();
  limits = LIMITS;
}
