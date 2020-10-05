import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChildrenContainerComponent } from "./components/children-container.component";
import { RouterModule } from "@angular/router";
import { RemoveSpacePipe } from "../Directives/removespacepipe";
import { ExceldwdDirective } from "../Directives/exceldwd.directive";
import { ArraySortPipe } from "../matchdashboard/orderBy.pipe";

@NgModule({
  declarations: [
    ChildrenContainerComponent,
    RemoveSpacePipe,
    ExceldwdDirective,
    ArraySortPipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ChildrenContainerComponent,
    RemoveSpacePipe,
    ExceldwdDirective,
    ArraySortPipe,
  ],
})
export class SharedModule {}
