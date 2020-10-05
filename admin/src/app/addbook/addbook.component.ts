import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { BookmakingService } from '../services/bookmaking.service';
import _ from 'lodash';
import { SportDataService } from '../services/sport-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  bookForm: FormGroup;

  bookTypesList = [];

  sportsList = [];
  sport: any = "";
  tournamentList = [];
  tournament: any = "";
  matchList = [];
  match: any = "";

  bookInfo: any;
  bookId: number;

  constructor(
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private bmService: BookmakingService,
    private sportService: SportDataService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.bookId = params.bookId;
      if (this.bookId) {
        this.GetBookInfo();
      }
    })
  }

  ngOnInit() {
    this.initBookForm();
    if (!this.bookId) {
      this.GetSportList();
      this.BookTypes();
    }
  }

  initBookForm() {
    this.bookForm = this.fb.group({
      bookType: ['', Validators.required],
      headerName: ['', Validators.required],
      isActive: [false, Validators.required],
      maxProfit: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      maxStake: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      minStake: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      maxStakePerRate: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      maxRate: ['', [ Validators.required,Validators.min(1.00), Validators.max(1000.00)]],
      minRate: ['', [ Validators.required,Validators.min(1.00), Validators.max(100.00)]],
      rateDifference: ['', [ Validators.required,Validators.min(1), Validators.max(100)]],
      // runner1: [''],
      // runner2: [''],
      sport: ['', Validators.required],
      tournament: ['', Validators.required],
      match: ['', Validators.required]
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.bookForm.controls; }

  GetBookInfo() {
    this.bmService.GetBookInfo(this.bookId).subscribe(data => {
      this.bookInfo = data.data;
      this.bookForm.controls["headerName"].setValue(this.bookInfo.headerName);
      this.bookForm.controls["isActive"].setValue(this.bookInfo.isActive == 1 ? true : false);
      this.bookForm.controls["maxProfit"].setValue(this.bookInfo.maxProfit);
      this.bookForm.controls["maxStake"].setValue(this.bookInfo.maxStake);
      this.bookForm.controls["minStake"].setValue(this.bookInfo.minStake);
      this.bookForm.controls["maxStakePerRate"].setValue(this.bookInfo.maxStakePerRate);
      this.bookForm.controls["minRate"].setValue(this.bookInfo.minRate);
      this.bookForm.controls["maxRate"].setValue(this.bookInfo.maxRate);
      this.bookForm.controls["rateDifference"].setValue(this.bookInfo.rateDifference);
      // this.bookForm.controls["runner1"].setValue(data.runnerdata[0].name);
      // this.bookForm.controls["runner2"].setValue(data.runnerdata[1].name);


      if (this.bookId) {
        this.GetSportList();
        this.BookTypes();
      }

    }, err => {

    })
  }


  BookTypes() {
    this.bmService.BookTypes().subscribe(data => {
      this.bookTypesList = data.data;
      if (this.bookInfo) {
        _.forEach(this.bookTypesList, bookType => {
          if (bookType.id === this.bookInfo.bookType) {
            this.bookForm.controls["bookType"].setValue(bookType);
          }
        });
      }
    })
  }

  selectBookType() {
    this.bookForm.controls['headerName'].setValue(this.bookForm.value.bookType.header);
  }

  GetSportList() {
    this.sportService.GetSportList().subscribe(data => {

      this.sportsList = data.tickerList;

      if (this.bookInfo) {
        _.forEach(this.sportsList, sport => {
          if (sport.betfairId === this.bookInfo.sportId) {
            this.bookForm.controls["sport"].setValue(sport);
            this.GetTournamentList();
          }
        });
      }
    });

  }

  GetTournamentList() {


    this.tournamentList = [];
    this.tournament = "";
    this.matchList = [];
    this.match = "";

    let sid = this.bookForm.value.sport.betfairId;
    let isall = 1;
    this.sportService.GetTournamentList(sid, isall).subscribe(data => {
      // console.log(data);
      this.tournamentList = data.tournamentList;

      if (this.bookInfo) {
        _.forEach(this.tournamentList, tournament => {
          if (tournament.betfairId === this.bookInfo.tourId) {
            this.bookForm.controls["tournament"].setValue(tournament);
            this.getMatchList();
          }
        });
      }

    });

  }

  getMatchList() {
    this.matchList = [];
    this.match = "";

    let sid = this.bookForm.value.sport.betfairId;
    let tid = this.bookForm.value.tournament.betfairId;
    let isall = 1;
    // let status = 1;
    let status = "open";

    this.sportService.GetMatchList(sid, tid, isall, status).subscribe(data => {
      console.log(data);
      this.matchList = data.matchList;

      if (this.bookInfo) {
        _.forEach(this.matchList, match => {
          if (match.id === this.bookInfo.matchId) {
            this.bookForm.controls["match"].setValue(match);
          }
        });
      }

    }, err => {
      console.log(err);
    });
  }

  onClear() {
    // this.bookForm.reset();
  }


  onSubmit() {
    console.log(this.bookForm);
    if (!this.bookId) {
      this.AddBook();
    }
    else {
      this.UpdateBook();
    }

  }


  AddBook() {

    let bookData = {
      "bookType": this.bookForm.value.bookType.id,
      "headerName": this.bookForm.value.headerName,
      "isActive": this.bookForm.value.isActive ? '1' : '0',
      "matchDate": this.bookForm.value.match.matchDate,
      "matchId": this.bookForm.value.match.id,
      "matchName": this.bookForm.value.match.matchName,
      "maxProfit": this.bookForm.value.maxProfit,
      "maxRate": this.bookForm.value.maxRate,
      "maxStake": this.bookForm.value.maxStake,
      "maxStakePerRate": this.bookForm.value.maxStakePerRate,
      "minRate": this.bookForm.value.minRate,
      "minStake": this.bookForm.value.minStake,
      "rateDifference": this.bookForm.value.rateDifference,
      "runner": ["",""],
      "sportId": this.bookForm.value.sport.betfairId,
      "sportName": this.bookForm.value.sport.sportName,
      "tourId": this.bookForm.value.tournament.betfairId,
      "tourName": this.bookForm.value.tournament.tournamentName
    }

    // console.log(bookData);

    this.bmService.AddBook(bookData).subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.bookForm.reset();
        this.bookForm.controls["bookType"].setValue("");
        this.bookForm.controls["sport"].setValue("");
        this.bookForm.controls["tournament"].setValue("");
        this.bookForm.controls["match"].setValue("");
        setTimeout(() => {
          this.router.navigateByUrl('/bookmaker/index')
        }, 2000)
      }
      else {
        this.notifyService.error(data.result);
      }
    }, err => {

    })
  }

  UpdateBook() {

    let bookData = {
      "bookId": this.bookId,
      "headerName": this.bookForm.value.headerName,
      "maxRate": this.bookForm.value.maxRate,
      "maxStake": this.bookForm.value.maxStake,
      "maxStakePerRate": this.bookForm.value.maxStakePerRate,
      "minRate": this.bookForm.value.minRate,
      "minStake": this.bookForm.value.minStake,
      "rateDifference": this.bookForm.value.rateDifference,
    }


    this.bmService.UpdateBook(bookData).subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        setTimeout(() => {
          this.router.navigateByUrl('/bookmaker/index')
        }, 2000)
      }
      else {
        this.notifyService.error(data.result);
      }
    }, err => {

    })
  }

  onCancel() {
    this._location.back();
  }

}
