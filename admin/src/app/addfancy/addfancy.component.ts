import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { FancyService } from '../services/fancy.service';
import { SportDataService } from '../services/sport-data.service';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addfancy',
  templateUrl: './addfancy.component.html',
  styleUrls: ['./addfancy.component.css']
})
export class AddfancyComponent implements OnInit {
  fancyForm: FormGroup;
  fancyTypesList = [];

  sportsList = [];
  sport: any = "";
  tournamentList = [];
  tournament: any = "";
  matchList = [];
  match: any = "";

  fancyInfo: any;
  fancyId: number;
  minstakeval: any;

  constructor(
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private fancyService: FancyService,
    private sportService: SportDataService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.fancyId = params.fancyId;
      if (this.fancyId) {
        this.GetFancyInfobyId();
      }
    })
  }

  ngOnInit() {
    this.initFancyForm();
    if (!this.fancyId) {
      this.GetSportList();
      this.GetFancyTypes();
    }
  }

  initFancyForm() {
    this.fancyForm = this.fb.group({
      betDelay: ['', [ Validators.required,Validators.min(1), Validators.max(60)]],
      betName: ['', Validators.required],
      fancyType: ['', Validators.required],
      isActive: [false, Validators.required],
      isApplyComm: [false, Validators.required],
      maxLoss: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      maxProfit: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      maxStake: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      minStake: ['',[ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      maxStakePerRate: ['', [ Validators.required,Validators.min(1), Validators.max(10000000000)]],
      note: [''],
      position: ['', [ Validators.required,Validators.min(1), Validators.max(100)]],
      rateDifference: ['', [ Validators.required,Validators.min(1), Validators.max(100)]],
      rateRange: ['', [ Validators.required,Validators.min(1), Validators.max(100)]],
      rules: [''],
      sport: ['', Validators.required],
      tournament: ['', Validators.required],
      match: ['', Validators.required]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.fancyForm.controls; }


  GetFancyInfobyId() {
    this.fancyService.GetFancyInfobyId(this.fancyId).subscribe(data => {
      data = data.data;
      // console.log(data);
      this.fancyInfo = data;
      this.fancyForm.controls["betDelay"].setValue(data.betDelay);
      this.fancyForm.controls["betName"].setValue(data.fancyName);
      this.fancyForm.controls["fancyType"].setValue(data.fancyType);
      this.fancyForm.controls["isActive"].setValue(data.isActive == 1 ? true : false);
      this.fancyForm.controls["isApplyComm"].setValue(data.isApplyComm == 1 ? true : false);
      this.fancyForm.controls["maxLoss"].setValue(data.maxLoss);
      this.fancyForm.controls["maxProfit"].setValue(data.maxProfit);
      this.fancyForm.controls["maxStake"].setValue(data.maxStake);
      this.fancyForm.controls["minStake"].setValue(data.minStake);
      this.fancyForm.controls["maxStakePerRate"].setValue(data.maxStakePerRate);
      this.fancyForm.controls["note"].setValue(data.note);
      this.fancyForm.controls["position"].setValue(data.position);
      this.fancyForm.controls["rateDifference"].setValue(data.rateDifference);
      this.fancyForm.controls["rateRange"].setValue(data.rateRange);
      this.fancyForm.controls["rules"].setValue(data.rules);

      if (this.fancyId) {
        this.GetSportList();
        this.GetFancyTypes();
      }

    }, err => {

    })
  }

  GetFancyTypes() {
    this.fancyService.GetFancyTypes().subscribe(data => {
      this.fancyTypesList = data.fancyTypes
    })
  }

  GetSportList() {
    this.sportService.GetSportList().subscribe(data => {
      console.log(data);
      this.sportsList = data.tickerList;

      if (this.fancyInfo) {
        _.forEach(this.sportsList, sport => {
          if (sport.betfairId === this.fancyInfo.sportId) {
            this.fancyForm.controls["sport"].setValue(sport);
            this.GetTournamentList();
          }
        });
      }
    });

  }

  GetTournamentList() {

    // console.log(this.fancyForm.value.sport.betfairId);

    this.tournamentList = [];
    this.tournament = "";
    this.matchList = [];
    this.match = "";

    let sid = this.fancyForm.value.sport.betfairId;
    let isall = 1;
    this.sportService.GetTournamentList(sid, isall).subscribe(data => {
      // console.log(data);
      this.tournamentList = data.tournamentList;

      if (this.fancyInfo) {
        _.forEach(this.tournamentList, tournament => {
          if (tournament.betfairId === this.fancyInfo.tournamentId) {
            this.fancyForm.controls["tournament"].setValue(tournament);
            this.getMatchList();
          }
        });
      }

    });

  }

  

  getMatchList() {
    this.matchList = [];
    this.match = "";

    let sid = this.fancyForm.value.sport.betfairId;
    let tid = this.fancyForm.value.tournament.betfairId;
    let isall = 1;
    // let status = 1;
    let status = "open";

    this.sportService.GetMatchList(sid, tid, isall, status).subscribe(data => {
      console.log(data);
      this.matchList = data.matchList;

      if (this.fancyInfo) {
        _.forEach(this.matchList, match => {
          if (match.id === this.fancyInfo.matchId) {
            this.fancyForm.controls["match"].setValue(match);
          }
        });
      }

    }, err => {
      console.log(err);
    });
  }

  savefancyDetails() {
    console.log(this.fancyForm);
    let fancyData = {
      "betDelay": this.fancyForm.value.betDelay,
      "betName": this.fancyForm.value.betName,
      "fancyType": this.fancyForm.value.fancyType,
      "isActive": this.fancyForm.value.isActive ? '1' : '0',
      "isApplyComm": this.fancyForm.value.isApplyComm ? '1' : '0',
      "matchDate": this.fancyForm.value.match.matchDate,
      "matchId": this.fancyForm.value.match.id,
      "matchName": this.fancyForm.value.match.matchName,
      "maxLoss": this.fancyForm.value.maxLoss,
      "maxProfit": this.fancyForm.value.maxProfit,
      "maxStake": this.fancyForm.value.maxProfit,
      "maxStakePerRate": this.fancyForm.value.maxStakePerRate,
      "minStake": this.fancyForm.value.minStake,
      "note": this.fancyForm.value.note,
      "position": this.fancyForm.value.position,
      "rateDifference": this.fancyForm.value.rateDifference,
      "rateRange": this.fancyForm.value.rateRange,
      "rules": this.fancyForm.value.rules,
      "sportId": this.fancyForm.value.sport.betfairId,
      "sportName": this.fancyForm.value.sport.sportName,
      "tournamentId": this.fancyForm.value.tournament.betfairId,
      "tournamentName": this.fancyForm.value.tournament.tournamentName
    }

    if (this.fancyInfo) {
      fancyData['fancyCode'] = this.fancyInfo.fancyCode;
      fancyData['fancyName'] = this.fancyForm.value.betName;

      this.UpdateFancy(fancyData);
    }
    else {
      this.AddFancy(fancyData);
    }

  }

  AddFancy(fancyData) {
    this.fancyService.AddFancy(fancyData).subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.fancyForm.reset();
        this.fancyForm.controls["fancyType"].setValue("");
        this.fancyForm.controls["sport"].setValue("");
        this.fancyForm.controls["tournament"].setValue("");
        this.fancyForm.controls["match"].setValue("");
        setTimeout(() => {
          this.router.navigateByUrl('/fancy')
        }, 2000)
      }
      else {
        this.notifyService.error(data.result);
      }

    }, err => {

    });
  }

  UpdateFancy(fancyData) {
    this.fancyService.UpdateFancy(fancyData).subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        setTimeout(() => {
          this.router.navigateByUrl('/fancy')
        }, 2000)
      }
      else {
        this.notifyService.error(data.result);
      }
    }, err => {

    });
  }


  onClear() {
    // this.fancyForm.reset();
    // this.fancyForm.controls["fancyType"].setValue("");
    // this.fancyForm.controls["sport"].setValue("");
    // this.fancyForm.controls["tournament"].setValue("");
    // this.fancyForm.controls["match"].setValue("");
  }

  onCancel() {
    this._location.back();
  }

}
