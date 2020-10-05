import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LimitsService } from '../services/limits.service';
import { NotificationService } from '../shared/notification.service';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-recevcash',
  templateUrl: './recevcash.component.html',
  styleUrls: ['./recevcash.component.css']
})
export class RecevcashComponent implements OnInit {
  Recevcashform:FormGroup;
  submitted=false;
  userId: string;
  userName: string;
  name: string;
  amount: any;
  changedcoin: number=0;

  constructor(
    private route:ActivatedRoute,
    private limits:LimitsService,
    private formbuilder : FormBuilder,
    private router: Router,
    public notification:NotificationService,
    public report :ReportsService
    ) { }

    
    

  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.userName=this.route.snapshot.paramMap.get('userName');
    this.name=this.route.snapshot.paramMap.get('name');

    this.Recevcashform=this.formbuilder.group({
      coins:['',[ Validators.required,Validators.min(0), Validators.max(10000000000)]],
      note:[''],
    })

    this.usercollectionreportapi();
    this.formControlcoinChanged()
  }

  usercollectionreportapi(){
    this.report.UserCollectionReport(this.userId).subscribe(resp=>{
      this.amount=resp.amount;
      // this.respamt=resp.amount;
    })
  }

  formControlcoinChanged() {
    this.Recevcashform.get('coins').valueChanges.subscribe(
        (mode: number) => {
          this.changedcoin=mode;
            if(mode > this.amount){
              this.Recevcashform.controls['coins'].setValue(this.amount);
            }
    });
  }


  get f() { return this.Recevcashform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.Recevcashform.invalid) {
            return;
        }else{
            let formdata=this.Recevcashform.value;
            let data={
              USERID:this.userId,
              AMOUNT:formdata.coins
            }

            this.limits.ReceiveCash(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                setTimeout(() => {
                  this.router.navigateByUrl('/userdashboard/'+this.userId);
                }, 2000);
              }else{
                this.notification.error(resp.result);
              }
            })
        }
  }

}
