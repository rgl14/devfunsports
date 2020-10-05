import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { SportDataService } from '../services/sport-data.service';
import { Router } from '@angular/router';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-addscore',
  templateUrl: './addscore.component.html',
  styleUrls: ['./addscore.component.css']
})
export class AddscoreComponent implements OnInit {

  addScoreform:FormGroup;
  submitted=false;
  statusvalue: string;
  sportbfId: any;
  TourBfId: any;
  sportsList=4;
  tournamentList=[];
  matchList=[];
  formdata: any;
  constructor(
    private formbuilder:FormBuilder,
    private notifyService:NotificationService,
    private SportSettingdata:SportDataService,
    private scoreinput :ScoreService,
    private router:Router
    ) { }

  ngOnInit() {

    this.addScoreform=this.formbuilder.group({
      sport:['4'],
      tournament:['',Validators.required],
      match:['',Validators.required]
    })
    this.GetTournamentList()
  }

  onClear() {
    this.submitted = false;
    this.addScoreform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addScoreform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addScoreform.invalid) {
            return;
        }else{
          console.log(this.addScoreform.value);
          this.formdata=this.addScoreform.value;
          this.scoreinput.AddScore(this.formdata.match.id).subscribe(data=>{
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              setTimeout(() => {
                this.router.navigateByUrl('/Scorelist')
              }, 2000)
            }else{
              this.notifyService.error(data.result);
            }
          })
        }
  }

  GetTournamentList(){
    this.sportbfId=this.addScoreform.controls['sport'].value;
    // console.log(this.sportbfId);
    this.SportSettingdata.GetTournamentList(this.sportbfId,1).subscribe(resp=>{
      this.tournamentList=resp.tournamentList;
    })
  }

  GetMatchList(){
    this.statusvalue="";
    this.TourBfId=this.addScoreform.controls['tournament'].value;
    this.SportSettingdata.GetMatchList(this.sportbfId,this.TourBfId.betfairId,1,this.statusvalue).subscribe(resp=>{
      this.matchList=resp.matchList;
    })
  }

}
