import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { ReportsService } from "../services/reports.service";
import { ActivatedRoute } from "@angular/router";
import { UsermanagementService } from "../services/usermanagement.service";
import { Subscription } from "rxjs";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AnalysisSignalrService } from "../services/analysis-signalr.service";
import { SportDataService } from "../services/sport-data.service";
import { FancySignalrService } from "../services/fancy-signalr.service";
import { MarketSignalrService } from "../services/market-signalr.service";
import { DomSanitizer } from "@angular/platform-browser";
import { FancyService } from "../services/fancy.service";
import _ from "lodash";
import { NotificationService } from "../shared/notification.service";
import { child } from "./betList/child.componet";
import { name } from "./betList/name.coponent";
import { RejectBetdialog } from "./betList/rejectbet.componet";
import { BreadcrumbService } from "angular-crumbs";
import { fancyname } from './betList/fancyname.component';

@Component({
  selector: "app-matchdashboard",
  templateUrl: "./matchdashboard.component.html",
  styleUrls: ["./matchdashboard.component.css"],
})
export class MatchdashboardComponent implements OnInit, OnDestroy {
  matchId: string;
  matchMarkets = [];
  sessionMarkets = [];
  title: string;
  sprtID: string;
  mtbfID: string;
  MktId: string;
  bookMarkets = [];
  analysiseventdata: Subscription;
  analysisevent: any;
  analysisdata: Subscription;
  Event: any;
  Eventname: any;
  EventDate: any;
  isInplay: any;
  tvConfig: any;
  fancyData = [];
  AllMarkets: any;
  EventMarketId: any;
  Fancysignalrdata: Subscription;
  BookRates = [];
  curTime: any;
  fancyname: any;
  fancybook = [];
  admReport: any;
  bookData: any;
  bmBookData: any;
  MObetdata = [];
  fancyBetdata = [];
  bmBetdata = [];
  oldrunnerData: any;
  isMarketSignalr: boolean = false;
  isFancySignalr: boolean = false;
  userId: any;
  MatchBetHide: boolean = true;
  fancyBetHide: boolean = true;
  bmBetHide: boolean = true;
  MatchTvHide: boolean;
  matchBfId: string;
  liveUrl: string;
  liveUrlSafe: any;
  eventfancybook: any;
  fancybetArray = [];
  TvWidth: number;
  showtv: boolean = false;
  Flag: string;
  sessionpnlreport = [];
  totalsessionpnl: any;
  sessionpnlInterval: any;
  liveScore: any;
  socket: any;
  BSFscore: any;
  unMatchedBetdata = [];
  type = "";
  constructor(
    private route: ActivatedRoute,
    private getreports: ReportsService,
    private usermanagement: UsermanagementService,
    public dialog: MatDialog,
    private analysisservice: AnalysisSignalrService,
    private sportdataservice: SportDataService,
    private fancysignalrservice: FancySignalrService,
    private marketservice: MarketSignalrService,
    private sanitizer: DomSanitizer,
    private fancyservice: FancyService,
    private notifyService: NotificationService,
    private breadcrumb: BreadcrumbService
  ) {
    this.usermanagement.getAccountInfo().subscribe((resp) => {
      this.userId = resp.data.userId;
      this.ConnectAnalysisdata(this.userId);
    });
  }
  allBetCols = [
    {
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      minWidth: 30,
    },
    {
      headerName: "Client",
      resizable: true,
      minWidth: 100,
      cellRendererFramework: name,
      cellStyle: { cursor: "pointer", "font-weight": "bolder" },
    },
    {
      headerName: "Selection",
      field: "runnerName",
      filter: "agTextColumnFilter",
      resizable: true,
      minWidth: 100,
    },
    {
      headerName: "B/L",
      field: "backLay",
      minWidth: 50,
    },
    { headerName: "Odds", field: "odds", minWidth: 80 },
    { headerName: "Stake", field: "stake", minWidth: 80 },
    {
      headerName: "P&L",
      minWidth: 80,
      valueGetter: function (params) {
        return Number(((params.data.odds - 1) * params.data.stake).toFixed(2));
      },
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 50,
    },
    {
      headerName: "Placed Time",
      field: "date",
      resizable: true,
      minWidth: 150,
    },
    {
      headerName: "A",
      field: "action",
      minWidth: 50,
      cellRendererFramework: child,
    },
    {
      headerName: "Info",
      field: "source",
      minWidth: 50,
    },
    {headerName: "ID", field: "id", minWidth: 50 },
    {headerName: "DS",field: "adminUsername",minWidth: 50,},
    {headerName: "SM",field: "superMasterUsername",minWidth: 50,},
    {headerName: "M",field: "masterUsername",minWidth: 50,},
    {headerName: "AGT", field: "agentUsername", minWidth: 50 },
  ];

  fancyBetCols = [
    {
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      minWidth: 30,
    },
    {
      headerName: "Client",
      cellRendererFramework: fancyname,
      cellStyle: { cursor: "pointer", "font-weight": "bolder" },
      resizable: true,
      minWidth: 100,
    },
    {
      headerName: "Selection",
      field: "runnerName",
      filter: "agTextColumnFilter",
      resizable: true,
      minWidth: 100,
    },
    {
      headerName: "B/L",
      field: "backLay",
      minWidth: 50,
    },
    { headerName: "Score", field: "score", minWidth: 80 },
    { headerName: "Rate", field: "odds", minWidth: 80 },
    { headerName: "Stake", field: "stake", minWidth: 80 },
    {
      headerName: "P&L",
      minWidth: 80,
      valueGetter: function (params) {
        return Number(
          ((params.data.odds * params.data.stake) / 100).toFixed(2)
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 50,
    },
    {
      headerName: "Placed Time",
      field: "date",
      resizable: true,
      minWidth: 150,
    },
    {
      headerName: "A",
      field: "action",
      minWidth: 50,
      cellRendererFramework: child,
    },
    {
      headerName: "Info",
      field: "source",
      minWidth: 50,
    },
    {headerName: "ID", field: "id", minWidth: 50 },
    {headerName: "DS",field: "adminUsername",minWidth: 50,},
    {headerName: "SM",field: "superMasterUsername",minWidth: 50,},
    {headerName: "M",field: "masterUsername",minWidth: 50,},
    {headerName: "AGT", field: "agentUsername", minWidth: 50 },
  ];

  bmBetCols = [
    {
      headerName: "",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      minWidth: 30,
    },
    { headerName: "Client", field: "clUsername", minWidth: 100 },
    {
      headerName: "Selection",
      field: "runnerName",
      filter: "agTextColumnFilter",
      resizable: true,
      minWidth: 100,
    },
    {
      headerName: "B/L",
      field: "backLay",
      minWidth: 50,
    },
    { headerName: "Odds", field: "odds", minWidth: 50 },
    { headerName: "Stake", field: "stake", minWidth: 80 },
    {
      headerName: "P&L",
      minWidth: 80,
      valueGetter: function (params) {
        return Number(
          ((params.data.odds / 100) * params.data.stake).toFixed(2)
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 50,
    },
    {
      headerName: "Placed Time",
      field: "date",
      resizable: true,
      minWidth: 150,
    },
    {
      headerName: "A",
      field: "action",
      minWidth: 50,
      cellRendererFramework: child,
    },
    {
      headerName: "Info",
      field: "source",
      minWidth: 50,
    },
    {headerName: "ID", field: "id", minWidth: 50 },
    {headerName: "DS",field: "adminUsername",minWidth: 50,},
    {headerName: "SM",field: "superMasterUsername",minWidth: 50,},
    {headerName: "M",field: "masterUsername",minWidth: 50,},
    {headerName: "AGT", field: "agentUsername", minWidth: 50 },
  ];

  admBookCols = [
    { headerName: "Client", field: "clUsername", minWidth: 100 },
    { headerName: "Client", field: "clUsername", minWidth: 100 },
    { headerName: "Client", field: "clUsername", minWidth: 100 },
  ];

  admBmBookCols = [
    { headerName: "Client", field: "clUsername", minWidth: 100 },
    { headerName: "Client", field: "clUsername", minWidth: 100 },
    { headerName: "Client", field: "clUsername", minWidth: 100 },
  ];

  settleCols = [
    { headerName: "Market Name", field: "market", minWidth: 100 },
    { headerName: "Result", field: "result", minWidth: 100 },
    { headerName: "P|L", field: "position", minWidth: 100 },
  ];

  ConnectAnalysisdata(userId) {
    var count = 0;
    this.analysisdata = this.analysisservice.analysisSource.subscribe(
      (resp) => {
        if (resp != null) {
          // console.log(resp);
          count++;
          this.analysiseventdata = resp;
          this.Event = this.analysiseventdata[this.sprtID].eventList[
            this.mtbfID
          ];
          // console.log(this.Event);
          this.matchBfId = this.Event.bfId;
          this.Eventname = this.Event.name;
          this.EventDate = this.Event.eventDate;
          this.isInplay = this.Event.isInplay;
          this.tvConfig = this.Event.tvConfig;
          this.admReport = this.Event._admReport[userId];
          this.eventfancybook = this.admReport.fancyBook;
          this.bookData = this.admReport.bookData;
          this.bmBookData = this.admReport.bmBookData;
          // console.log(this.bmBookData)
          if (this.admReport.moBetdata != null) {
            this.MObetdata = this.admReport.moBetdata;
            this.MObetdata.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return <any>new Date(b.date) - <any>new Date(a.date);
            });
          }

          if (this.admReport.fancyBetdata != null) {
            this.fancyBetdata = this.fancybetformat(
              this.admReport.fancyBetdata
            );
          }
          if (this.admReport.bmBetdata != null) {
            this.bmBetdata = this.admReport.bmBetdata;
            this.bmBetdata.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return <any>new Date(b.date) - <any>new Date(a.date);
            });
          }
          if (this.admReport.bmBetdata != null) {
            let data = this.admReport.allbetdata;

            _.forEach(data, (item, value) => {
              if (item.status != "Matched") {
                this.unMatchedBetdata.push(item);
              }
            });
          }
          if (!this.isFancySignalr) {
            if (this.Event.fancyList != null) {
              this.fancyData = this.Event.fancyList;
            }
          }
          if (!this.isMarketSignalr) {
            this.AllMarkets = this.Event.mktList;
            // console.log(this.AllMarkets);
          }

          if (this.bookData.runner1name != null) {
            _.forEach(this.AllMarkets[0].runnerData, (item, index) => {
              if (
                this.AllMarkets[0].runnerData[index].runnerName ==
                this.bookData.runner1name
              ) {
                this.AllMarkets[0].runnerData[index][
                  "book"
                ] = this.bookData.runner1Book;
              }
              if (
                this.AllMarkets[0].runnerData[index].runnerName ==
                this.bookData.runner2name
              ) {
                this.AllMarkets[0].runnerData[index][
                  "book"
                ] = this.bookData.runner2Book;
              }
              if (
                this.AllMarkets[0].runnerData[index].runnerName ==
                this.bookData.runner3name
              ) {
                this.AllMarkets[0].runnerData[index][
                  "book"
                ] = this.bookData.runner3Book;
              }
            });
          }
          this.EventMarketId = this.Event.mktList[0].bfId;
          if (count == 1) {
            this.getHubaddress();
            this.fancysignalrservice.connectFancy(
              "http://173.249.43.228:11111",
              this.matchId
            );
          }
        }
      }
    );
  }

  fancybetformat(fancybetdata) {
    this.fancybetArray = [];
    _.forEach(fancybetdata, (item, index) => {
      _.forEach(item, (item1, index) => {
        this.fancybetArray.push(item1);
      });
    });
    this.fancybetArray.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return <any>new Date(a.date) - <any>new Date(b.date);
    });
    // console.log(this.fancybetArray)
    return this.fancybetArray.reverse();
  }

  getHubaddress() {
    this.sportdataservice.HubAddress(this.EventMarketId).subscribe((resp) => {
      // console.log(resp)
      if (resp != null) {
        // if (this.Flag == "1") {
        this.marketservice.connectMarket(resp, this.AllMarkets);
        // }
      }
      this.marketservice.marketSource.subscribe((runner) => {
        if (runner != null) {
          this.isMarketSignalr = true;
          // console.log(runner)
          let marketIndex = _.findIndex(this.AllMarkets, function (o) {
            return o.bfId == runner.marketid;
          });
          if (marketIndex > -1) {
            // this.selectionid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
            let MktRunnerData = this.AllMarkets[marketIndex].runnerData;
            // this.noSpaceMarketid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
            var txt = runner.runner
              .replace(/[^a-z0-9\s]/gi, "")
              .replace(/[_\s]/g, "_");
            _.forEach(MktRunnerData, (item, index) => {
              if (item.runnerName == runner.runner) {
                this.oldrunnerData = MktRunnerData[index];
                this.AllMarkets[marketIndex].runnerData[index] = runner;
                this.AllMarkets[marketIndex].runnerData[index]["runnerName"] =
                  runner.runner;
                this.AllMarkets[marketIndex].runnerData[index]["status"] =
                  runner.runnerStatus;
                if (
                  this.AllMarkets[marketIndex].runnerData[index].runnerName ==
                  this.bookData.runner1name
                ) {
                  this.AllMarkets[marketIndex].runnerData[index][
                    "book"
                  ] = this.bookData.runner1Book;
                }
                if (
                  this.AllMarkets[marketIndex].runnerData[index].runnerName ==
                  this.bookData.runner2name
                ) {
                  this.AllMarkets[marketIndex].runnerData[index][
                    "book"
                  ] = this.bookData.runner2Book;
                }
                if (
                  this.AllMarkets[marketIndex].runnerData[index].runnerName ==
                  this.bookData.runner3name
                ) {
                  this.AllMarkets[marketIndex].runnerData[index][
                    "book"
                  ] = this.bookData.runner3Book;
                }
                if (
                  item.back1 != runner.back1 ||
                  item.backSize1 != runner.backSize1
                ) {
                  $("#selection_" + txt + " .back-1").addClass("spark");
                  const back1 = $("#selection_" + txt + " .back-1");
                  this.removeChangeClass(back1);
                }
                if (
                  item.back2 != runner.back2 ||
                  item.backSize2 != runner.backSize2
                ) {
                  $("#selection_" + txt + " .back-2").addClass("spark");
                  const back2 = $("#selection_" + txt + " .back-2");
                  this.removeChangeClass(back2);
                }
                if (
                  item.back3 != runner.back3 ||
                  item.backSize3 != runner.backSize3
                ) {
                  $("#selection_" + txt + " .back-3").addClass("spark");
                  const back3 = $("#selection_" + txt + " .back-3");
                  this.removeChangeClass(back3);
                }

                if (
                  item.lay1 != runner.lay1 ||
                  item.laySize1 != runner.laySize1
                ) {
                  $("#selection_" + txt + " .lay-1").addClass("spark");
                  const lay1 = $("#selection_" + txt + " .lay-1");
                  this.removeChangeClass(lay1);
                }
                if (
                  item.lay2 != runner.lay2 ||
                  item.laySize2 != runner.laySize2
                ) {
                  $("#selection_" + txt + " .lay-2").addClass("spark");
                  const lay2 = $("#selection_" + txt + " .lay-2");
                  this.removeChangeClass(lay2);
                }
                if (
                  item.lay3 != runner.lay3 ||
                  item.laySize3 != runner.laySize3
                ) {
                  $("#selection_" + txt + " .lay-3").addClass("spark");
                  const lay3 = $("#selection_" + txt + " .lay-3");
                  this.removeChangeClass(lay3);
                }
                // }
              }
            });
          }
        }
      });

      var fancysignalrcount = 0;
      this.Fancysignalrdata = this.fancysignalrservice.fancySource.subscribe(
        (fancy) => {
          if (fancy != null) {
            // console.log(fancy);
            fancysignalrcount++;
            if (fancysignalrcount == 1) {
              // this.socketConnection(this.matchBfId);
            }
            // this.setDatabsfScore();
            this.isFancySignalr = true;
            this.fancyData = fancy.data;
            this.liveScore = fancy.liveScore;
            _.forEach(this.fancyData, (item, index) => {
              if (this.eventfancybook != null) {
                item["book"] = this.eventfancybook[item.id];
              }
            });
            this.BookRates = fancy.bookRates;
            // console.log(this.BookRates);
            _.forEach(this.BookRates, (item, index) => {
              if (item.name == "BOOK MAKING") {
                _.forEach(item.runnerData, (item1, index) => {
                  if (this.bmBookData != null) {
                    if (item1.name == this.bmBookData.runner1name) {
                      item1["book"] = this.bmBookData.runner1Book;
                    }
                    if (item1.name == this.bmBookData.runner2name) {
                      item1["book"] = this.bmBookData.runner2Book;
                    }
                  }
                });
              }
            });
            this.curTime = fancy.curTime;
          }
        }
      );
    });
  }

  trackByfancyId(index, item) {
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return item.id;
  }

  trackByFn(index, item) {
    return item.id;
  }
  trackByName(index, item) {
    return item.name;
  }
  trackByindex(index, item) {
    return index;
  }

  removeChangeClass(changeClass) {
    setTimeout(() => {
      changeClass.removeClass("spark");
    }, 300);
  }

  UpdateFancyStatus(code, active) {
    this.fancyservice.UpdateFancyStatus(code, active).subscribe(
      (data) => {
        if (data.status == "Success") {
          this.notifyService.success(data.result);
        } else {
          this.notifyService.error(data.result);
        }
      },
      (err) => {}
    );
  }
  openTv() {
    if (this.showtv == false) {
      this.showtv = true;
      // if (this.tvConfig != null && this.tvConfig.channelIp != null) {
      $("#streamingBox").fadeIn();
      this.liveUrl =
        "http://tv.allexch.com/index.html?token=696363a6-035b-450c-8ec6-312e779732ac&mtid=" +
        this.matchBfId;
      this.liveUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.liveUrl
      );
      // } else {
      //   $("#streamingBox").fadeIn();
      //   this.liveUrl =
      //     "https://videoplayer.betfair.com/GetPlayer.do?tr=1&eID=" +
      //     this.matchBfId +
      //     "&width=450&height=290&allowPopup=true&contentType=viz&statsToggle=hide&contentOnly=true";
      //   this.liveUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      //     this.liveUrl
      //   );
      // }

      let blogUrl: any = `${this.liveUrl}&mtid=${this.matchBfId}`;
      $("#iframeTv").attr("src", blogUrl);
    } else {
      this.showtv = false;
      this.closeTv();
    }
  }

  closeTv() {
    $("#streamingBox").fadeOut();
  }
  ngOnInit() {
    this.sprtID = this.route.snapshot.paramMap.get("sportBfId");
    this.mtbfID = this.route.snapshot.paramMap.get("bfId");
    this.matchId = this.route.snapshot.paramMap.get("matchId");
    this.title = this.route.snapshot.paramMap.get("title");
    this.MktId = this.route.snapshot.paramMap.get("id");
    this.Flag = this.route.snapshot.paramMap.get("flag");
    this.TvWidth = window.innerWidth;

    this.breadcrumb.changeBreadcrumb(this.route.snapshot, this.title);

    let blogUrl: any = `${this.liveUrl}&mtid=${this.matchBfId}`;
    $("#iframeTv").attr("src", blogUrl);
    this.sessionpnlInterval = setInterval(() => {
      this.sessionpnlreportcall();
    }, 10000);
  }

  sessionpnlreportcall() {
    this.getreports.SessionPNl(this.matchId).subscribe((resp) => {
      if (resp.data != null) {
        this.sessionpnlreport = resp.data;
      }
      if (resp.total != null) {
        this.totalsessionpnl = resp.total;
      }
    });
  }

  ngOnDestroy() {
    if (this.Event != undefined) {
      this.analysisdata.unsubscribe();
      this.marketservice.UnsuscribeMarkets(this.AllMarkets);
      this.Fancysignalrdata.unsubscribe();
      this.fancysignalrservice.UnsuscribeFancy(this.matchId);
      this.isMarketSignalr = false;
      this.isFancySignalr = false;
    }
    // this.socket.disconnect();
    if (this.sessionpnlInterval) {
      clearInterval(this.sessionpnlInterval);
    }
  }

  openDeleteBetDialog(bet): void {
    console.log(bet);
    const dialogRef = this.dialog.open(RejectBetdialog, {
      width: "250px",
      data: bet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openfancybookDialog(fancy): void {
    // console.log(fancy);
    this.fancyservice.GetAnalysisFancyBook(fancy.id).subscribe((resp) => {
      this.fancybook = this.combinedFancyBook(resp.data);
      const dialogRef = this.dialog.open(FancyBookDialog, {
        width: "250px",
        data: {
          betdata: fancy,
          book: this.fancybook,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
      });
    });
  }

  combinedFancyBook(data) {
    var parentFancyData = [];
    var middleData = [];
    var matchValue = "";
    var lastKeyValue = "";
    var fistKeyValue;
    var i = 0;
    data.forEach((value, key) => {
      if (key == 0) {
        matchValue = value.Value;
      }
      if (matchValue != value.Value) {
        parentFancyData.push({
          Key: value.Key - 1,
          Value: matchValue,
        });
        fistKeyValue = value.Key;
      }
      matchValue = value.Value;
      lastKeyValue = value.Key;
    });
    parentFancyData.push({
      Key: fistKeyValue,
      Value: matchValue,
    });

    parentFancyData.forEach((item, index) => {
      if (index > 0) {
        data.forEach((value, key) => {
          if (
            item.Key > value.Key &&
            parentFancyData[index - 1].Key < value.Key
          ) {
            parentFancyData.push({
              Key: value.Key,
              Value: value.Value,
            });
          }
        });
      }
    });
    console.log(parentFancyData, middleData);
    return parentFancyData;
  }
}

@Component({
  selector: "fancybookdialog",
  template: `<h1 mat-dialog-title>{{ data.betdata.name }}</h1>

    <div mat-dialog-content>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>RUNS</th>
            <th>POSITION</th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngIf="data.book.length != 0">
            <tr *ngFor="let fbook of data.book | sort: 'Key'">
              <td>{{ fbook.Key }}</td>
              <td [ngClass]="fbook.Value >= 0 ? 'text-success' : 'text-danger'">
                {{ fbook.Value | number: "1.2-2" }}
              </td>
            </tr>
          </ng-container>
          <ng-container *ngIf="data.book.length == 0">
            <tr>
              <td colspan="2" style="text-align: center;">
                <b>No Book Available...</b>
              </td>
            </tr>
          </ng-container>
          <!-- <tr>
          <td colspan="2" style="text-align: center;"><b>No Book Available...</b></td>
          </tr> -->
        </tbody>
      </table>
    </div>

    <div mat-dialog-actions>
      <button mat-raised-button color="warn" (click)="onNoClick()">
        Cancel
      </button>
      <!-- <button mat-raised-button color="primary" [mat-dialog-close]="data" cdkFocusInitial>Update</button> -->
    </div>`,
})
export class FancyBookDialog {
  params: any;
  constructor(
    public dialogRef: MatDialogRef<FancyBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
