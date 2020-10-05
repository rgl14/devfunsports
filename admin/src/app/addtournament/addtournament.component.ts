import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { SportDataService } from '../services/sport-data.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addtournament',
  templateUrl: './addtournament.component.html',
  styleUrls: ['./addtournament.component.css']
})
export class AddtournamentComponent implements OnInit {

  addtournamentform:FormGroup;
  submitted=false;
  sportsList=[];
  formdata: any;
  constructor(private formbuilder:FormBuilder,private notifyService:NotificationService,private SportSettingdata:SportDataService,private router:Router, private _location: Location) { }

  ngOnInit() {
    this.SportSettingdata.GetSportList().subscribe(resp=>{
      this.sportsList=resp.tickerList;
    })

    this.addtournamentform=this.formbuilder.group({
      sport:['',Validators.required],
      tourname:['',Validators.required],
      tourbfid:['',Validators.required],
      isactive:false
    })
  }

  onClear() {
    this.submitted = false;
    this.addtournamentform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addtournamentform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addtournamentform.invalid) {
          this.notifyService.error('Not Submitted');
            return;
        }else{
          // console.log(this.addtournamentform.value)
          this.formdata=this.addtournamentform.value;
          if(this.formdata.isactive==true){
            var isactive=1
          }else{
            var isactive=0
          }
          var data={
            "betfairId":this.formdata.tourbfid,
            "isActive":isactive,
            "sportName":this.formdata.sport.sportName,
            "tournamentName":this.formdata.tourname
          }
          // console.log(data)
          this.SportSettingdata.AddTournament(data).subscribe(data=>{
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              setTimeout(() => {
                this.router.navigateByUrl('/tournamentlist')
              }, 2000)
            }else{
              this.notifyService.error(data.result);
            }
          })
        }
  }

  onCancel() {
    this._location.back();
  }

}
