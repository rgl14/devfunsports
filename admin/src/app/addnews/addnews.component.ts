import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TickerService } from '../services/ticker.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit {

  addnewsform:FormGroup;
  submitted=false;
  TickerId: any;
  formdata: any;
  tickerdata: any;
  constructor(
    private formbuilder:FormBuilder,
    private notification:NotificationService,
    private route:ActivatedRoute,
    private router: Router,
    private newsticker:TickerService,
    private _location: Location
    ) { }

  ngOnInit() {
    this.TickerId=this.route.snapshot.paramMap.get('id');
    this.addnewsform=this.formbuilder.group({
      ticker:['',Validators.required],
      displaytype:['1'],
      isactive:false,
      ispermanent:false,
    })
    this.newsticker.GetTickerList().subscribe((resp: any)=>{
      this.tickerdata=resp.tickerList;
      
      if (this.TickerId) {
        let currentTicker = resp.tickerList.find(ticker => ticker.id);
        this.addnewsform.controls.ticker.setValue(currentTicker.title)
      }
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.addnewsform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addnewsform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addnewsform.invalid) {
            return;
        }else{
          this.formdata=this.addnewsform.value;
          console.log(this.formdata)
          if(this.formdata.isactive){
            var isactive=1
          }else{
            var isactive=0
          }
          if(this.formdata.ispermanent){
            var ispermanent=1
          }else{
            var ispermanent=0
          } 
          var data={
            "displayType":this.formdata.displaytype,
            "isActive":isactive,
            "isPermanent":ispermanent,
            "title":this.formdata.ticker
          };
          console.log(data)
          this.newsticker.AddTicker(data).subscribe(resp=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.router.navigateByUrl("/newsticker");
            }else{
              this.notification.error(resp.result);
            }
          })
        }
  }

  onCancel() {
    this._location.back();
  }

}
