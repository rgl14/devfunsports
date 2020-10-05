import { Directive, HostListener, ViewContainerRef } from "@angular/core";
import { ExcelService } from "../services/excel.service";

@Directive({
  selector: "[excelDwd]",
})
export class ExceldwdDirective {
  constructor(
    private excel: ExcelService,
    private containerRef: ViewContainerRef
  ) {}

  @HostListener("click")
  onClick() {
    let component = this.containerRef["_view"].component;
    let date = new Date();
    this.excel.exportAsExcelFile(
      component.rowData,
      `TableData-${date.getTime()}`
    );
  }
}
