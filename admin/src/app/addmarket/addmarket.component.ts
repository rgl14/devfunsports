import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { SportDataService } from '../services/sport-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-addmarket',
  templateUrl: './addmarket.component.html',
  styleUrls: ['./addmarket.component.css']
})
export class AddmarketComponent implements OnInit {

  addmarketform:FormGroup;
  submitted=false;
  statusvalue: string;
  sportbfId: any;
  TourBfId: any;
  sportsList=[];
  tournamentList=[];
  matchList=[];
  statusList = [
    { key: '1', value: 'OPEN' },
    { key: '2', value: 'CURRENT' },
    { key: '4', value: 'SETTLED' },
    { key: '6', value: 'CLOSED' },
    { key: '5', value: 'INACTIVE' }
  ];
  formdata: any;
  MktSettingsPckgList:[];
  constructor(
    private formbuilder:FormBuilder,
    private notifyService:NotificationService,
    private SportSettingdata:SportDataService,
    private router:Router,
    private _location: Location
    ) { }

  ngOnInit() {
    this.SportSettingdata.GetSportList().subscribe(resp=>{
      this.sportsList=resp.tickerList;
    })
    this.SportSettingdata.GetMktSettingsPckgList().subscribe(data => {
      this.MktSettingsPckgList = data.data;
    })

    this.addmarketform=this.formbuilder.group({
      sport:['',Validators.required],
      tournament:['',Validators.required],
      match:['',Validators.required],
      MKTname:['',Validators.required],
      matchsetting:['',Validators.required],
      status:['',Validators.required],
      MKTbfid:['',Validators.required],
      MKTrate:['',Validators.required],
      MKTrunner1:['',Validators.required],
      MKTrunner2:['',Validators.required],
      MKTrunner3:[''],
      isActive:false,
      isBetallow:false,
      isLimit:false
    })
  }

  onClear() {
    this.submitted = false;
    this.addmarketform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addmarketform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addmarketform.invalid) {
            return;
        }else{
          // console.log(this.addmarketform.value);
          this.formdata=this.addmarketform.value;
          if(this.formdata.isActive==true){
            var isactive=1
          }else{
            var isactive=0
          }
          if(this.formdata.isBetallow==true){
            var isbetallow=1
          }else{
            var isbetallow=0
          }
          if(this.formdata.isLimit==true){
            var islimit=1
          }else{
            var islimit=0
          }
          let data={
            "betfairId":this.formdata.MKTbfid,
            "isActive":isactive,
            "isAllowBet":isbetallow,
            "isAllowLimit":islimit,
            "isAustralian":0,
            "marketRate":this.formdata.MKTrate,
            "marketStatus":this.formdata.status.value,
            "matchName":this.formdata.match.matchName,
            "mktName":this.formdata.MKTname,
            "runners":[this.formdata.MKTrunner1,this.formdata.MKTrunner2,this.formdata.MKTrunner3],
            "settingPckg":this.formdata.matchsetting.id,
            "sportName":this.formdata.sport.sportName,
            "tournamentName":this.formdata.tournament.tournamentName
          };
          // console.log(data)
          this.SportSettingdata.AddMarket(data).subscribe(data=>{
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              setTimeout(() => {
                this.router.navigateByUrl('/marketlist')
              }, 2000)
            }else{
              this.notifyService.error(data.result);
            }
          })
        }
  }

  GetTournamentList(){
    this.sportbfId=this.addmarketform.controls['sport'].value;
    console.log(this.sportbfId);
    this.SportSettingdata.GetTournamentList(this.sportbfId.betfairId,1).subscribe(resp=>{
      this.tournamentList=resp.tournamentList;
    })
  }

  GetMatchList(){
    this.statusvalue="";
    this.TourBfId=this.addmarketform.controls['tournament'].value;
    this.SportSettingdata.GetMatchList(this.sportbfId.betfairId,this.TourBfId.betfairId,1,this.statusvalue).subscribe(resp=>{
      this.matchList=resp.matchList;
    })
  }

  onCancel() {
    this._location.back();
  }

}
