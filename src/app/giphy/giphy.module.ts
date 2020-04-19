import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridComponent } from "./grid/grid.component";
import { SearchComponent } from "./search/search.component";
import { GiphyComponent } from "./giphy.component";
import { NgMaterialModule } from "../share/ng-material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, NgMaterialModule, FormsModule],
  declarations: [GridComponent, SearchComponent, GiphyComponent],
  exports: [GiphyComponent]
})
export class GiphyModule {}
