import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../services/score.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-score-input',
  templateUrl: './score-input.component.html',
  styleUrls: ['./score-input.component.css']
})
export class ScoreInputComponent implements OnInit {
  matchId: string;
  Comments: any;
  scoreData: any;
  hometeamstatus:any;
  awayteamstatus:any;
  updFreehit:boolean=true;
  updWBR:boolean=true;
  updNBR:boolean=true;

  constructor(
    private scoreinput :ScoreService,
    private route:ActivatedRoute,
    private router: Router,
    private notifyService:NotificationService,
    ) { }

  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.scoreInfo();
  }

  scoreInfo(){
      this.updFreehit=true;
      this.updWBR=true;
      this.updNBR=true;
    this.scoreinput.GetScoreInfo(this.matchId).subscribe(resp=>{
      // console.log(resp);
      this.scoreData=resp.data
    })
  }

  updateTeamsstatus(teamid,teamstatus){
    if(teamstatus==1){
      var status=0;
    }else{
      var status=1
    }
    this.scoreinput.UpdateScoreTeamStatus(teamid,status).subscribe(data=>{
      if (data.status == "Success") {
        this.scoreInfo();
        this.notifyService.success(data.result);
      }else{
        this.notifyService.error(data.result);
      }
    })
  }

  trackByFn(index,item){
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return index;
   }

  updatecomments(){
    var data={
      "comments":this.Comments,
      "matchId":this.matchId
    }
    this.scoreinput.UpdateComments(data).subscribe(data=>{
      if (data.status == "Success") {
        this.scoreInfo();
        this.notifyService.success(data.result);
      }else{
        this.notifyService.error(data.result);
      }
    })
  }

  updatescore(TID,RUN,BALL,WKT){
    this.scoreinput.UpdateScore(TID,RUN,BALL,WKT).subscribe(data=>{
      if (data.status == "Success") {
        this.scoreInfo();
        this.notifyService.success(data.result);
      }else{
        this.notifyService.error(data.result);
      }
    })
  }

  updateTeamFullscore(team){
    var splitoversball=team.overs.split(".");
    this.scoreinput.UpdateScore2(team.teamId,team.score,splitoversball[0],splitoversball[1],team.wickets).subscribe(data=>{
      if (data.status == "Success") {
        this.scoreInfo();
        this.notifyService.success(data.result);
      }else{
        this.notifyService.error(data.result);
      }
    })
  }

  updateFreehit(state){
    if(state=='FHR'){
      this.updFreehit=false;
    }
    if(state=='WBR'){
      this.updWBR=false;
    }
    if(state=='NBR'){
      this.updNBR=false;
    }
  }

  updatExtrascore(team,BALL,WKT,state){
    if(state=='FHR'){
      this.updFreehit=true;
    }
    if(state=='WBR'){
      this.updWBR=true;
    }
    if(state=='NBR'){
      this.updNBR=true;
    }
    this.scoreinput.UpdateScore(team.teamId,team.lastScore,BALL,WKT).subscribe(data=>{
      if (data.status == "Success") {
        this.scoreInfo();
        this.notifyService.success(data.result);
      }else{
        this.notifyService.error(data.result);
      }
    })
  }
  

}
