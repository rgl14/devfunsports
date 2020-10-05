import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { SportDataService } from '../services/sport-data.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-addmatch',
  templateUrl: './addmatch.component.html',
  styleUrls: ['./addmatch.component.css']
})
export class AddmatchComponent implements OnInit {

  addmatchform:FormGroup;
  submitted=false;
  sportsList=[];
  sportbfId: any;
  tournamentList=[];
  statusList = [
    { key: '1', value: 'OPEN' },
    { key: '2', value: 'CURRENT' },
    { key: '4', value: 'SETTLED' },
    { key: '6', value: 'CLOSED' },
    { key: '5', value: 'INACTIVE' }
  ];
  formdata: any;
  constructor(
    private formbuilder:FormBuilder,
    private notifyService:NotificationService,
    private SportSettingdata:SportDataService,
    private router:Router,
    private datepipe:DatePipe,
    private _location: Location) { }

  ngOnInit() {
    this.SportSettingdata.GetSportList().subscribe(resp=>{
      this.sportsList=resp.tickerList;
    })

    this.addmatchform=this.formbuilder.group({  
      sport:['',Validators.required],
      tournament:['',Validators.required],
      matchname:['',Validators.required],
      matchDate:['',Validators.required],
      status:['',Validators.required],
      matchbfid:['',Validators.required],
      isactive:false,
      isinplay:false
    })
  }

  onClear() {
    this.submitted = false;
    this.addmatchform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addmatchform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addmatchform.invalid) {
            return;
        }else{
          console.log(this.addmatchform.value)
          this.formdata=this.addmatchform.value;
          var medium = this.datepipe.transform(new Date(this.formdata.matchDate),"yyyy-MM-dd HH:mm:ss");
          console.log(medium); //output - Feb 14, 2019, 3:45:06 PM
          if(this.formdata.isactive==true){
            var isActive=1
          }else{
            var isActive=0
          }
          if(this.formdata.isinplay==true){
            var isInplay=1
          }else{
            var isInplay=0
          }
          var data={
            "betfairId":this.formdata.matchbfid,
            "isActive":isActive,
            "isInplay":isInplay,
            "matchDate":medium,
            "matchName":this.formdata.matchname,
            "matchStatus":this.formdata.status.value,
            "sportName":this.formdata.sport.sportName,
            "tournamentName":this.formdata.tournament.tournamentName
          };
          console.log(data)
          this.SportSettingdata.AddMatch(data).subscribe(data=>{
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              setTimeout(() => {
                this.router.navigateByUrl('/matchlist')
              }, 2000)
            }else{
              this.notifyService.error(data.result);
            }
          })
        }
  }

  GetTournamentList(){
    this.sportbfId=this.addmatchform.controls['sport'].value;
    console.log(this.sportbfId);
    this.SportSettingdata.GetTournamentList(this.sportbfId.betfairId,1).subscribe(resp=>{
      this.tournamentList=resp.tournamentList;
    })
  }

  onCancel() {
    this._location.back();
  }

}
