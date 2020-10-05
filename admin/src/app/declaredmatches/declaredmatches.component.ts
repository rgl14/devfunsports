import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportsService } from "../services/reports.service";

@Component({
  selector: "app-declaredmatches",
  templateUrl: "./declaredmatches.component.html",
  styleUrls: ["./declaredmatches.component.css"],
})
export class DeclaredmatchesComponent implements OnInit {
  matchId: any;
  title: any;
  MktId: any;
  matchMarkets: any;
  sessionMarkets: any;
  bookMarkets: any;
  sprtID: string;

  constructor(
    private route: ActivatedRoute,
    private getreports: ReportsService
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get("matchId");
    this.title = this.route.snapshot.paramMap.get("title");
    this.MktId = this.route.snapshot.paramMap.get("id");
    this.sprtID = this.route.snapshot.paramMap.get("sprtID");
    this.getmatchdashboard();
  }

  getmatchdashboard() {
    this.getreports.GetMatchDashboard(this.matchId).subscribe((resp) => {
      // console.log(resp);
      if (resp.matchMarkets != null) {
        this.matchMarkets = resp.matchMarkets;
      }
      if (resp.sessionMarkets != null) {
        this.sessionMarkets = resp.sessionMarkets;
      }
      if (resp.bookMarkets != null) {
        this.bookMarkets = resp.bookMarkets;
      }
    });
  }

  trackByFn(index, item) {
    return item.id;
  }
}
