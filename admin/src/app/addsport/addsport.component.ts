import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { SportDataService } from '../services/sport-data.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addsport',
  templateUrl: './addsport.component.html',
  styleUrls: ['./addsport.component.css']
})
export class AddsportComponent implements OnInit {

  addSportform:FormGroup;
  submitted=false;
  formdata: any;
  constructor(private formbuilder:FormBuilder,private notifyService:NotificationService,private SportSettingdata:SportDataService,private router:Router, private _location: Location) { }

  ngOnInit() {
    this.addSportform=this.formbuilder.group({
      sportname:['',Validators.required],
      sportbfid:['',Validators.required],
      isactive:false,
      showmenu:false
    })
  }

  onClear() {
    this.submitted = false;
    this.addSportform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addSportform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addSportform.invalid) {
            return;
        }else{
          // console.log(this.addSportform.value);
          this.formdata=this.addSportform.value;
          if(this.formdata.isactive==true){
            var isactive=1;
          }else{
            var isactive=0;
          }
          if(this.formdata.showmenu==true){
            var showmenu=1;
          }else{
            var showmenu=0;
          }
          var data={
            "betfairId":this.formdata.sportbfid,
            "img":"",
            "isActive":isactive,
            "showInMenu":showmenu,
            "sportName":this.formdata.sportname
          };
          // console.log(data)
          this.SportSettingdata.AddTournament(data).subscribe(data=>{
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              setTimeout(() => {
                this.router.navigateByUrl('../../sportlist')
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
