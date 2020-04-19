import { Component, Input } from "@angular/core";
import { Gif } from "../giphy.model";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})
export class GridComponent {
  @Input() gifs: Gif[];
}
