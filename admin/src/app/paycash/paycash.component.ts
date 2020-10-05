import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { LimitsService } from '../services/limits.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-paycash',
  templateUrl: './paycash.component.html',
  styleUrls: ['./paycash.component.css']
})
export class PaycashComponent implements OnInit {
  Paycashform:FormGroup;
  submitted=false;
  userId: string;
  userName: string;
  name: string;
  amount: any;
  changedcoin: number=0;
  respamt: any;

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

    this.Paycashform=this.formbuilder.group({
      coins:['',[ Validators.required,Validators.min(0), Validators.max(10000000000)]],
      note:[''],
    })
    this.usercollectionreportapi();
    this.formControlcoinChanged()
  }

  usercollectionreportapi(){
    this.report.UserCollectionReport(this.userId).subscribe(resp=>{
      this.amount=resp.amount*-1;
      this.respamt=resp.amount;
    })
  }

  formControlcoinChanged() {
    this.Paycashform.get('coins').valueChanges.subscribe(
        (mode: number) => {
          this.changedcoin=mode;
            if(mode > this.amount){
              this.Paycashform.controls['coins'].setValue(this.amount);
            }
    });
  }

  get f() { return this.Paycashform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.Paycashform.invalid) {
            return;
        }else{
            let formdata=this.Paycashform.value;
            let data={
              USERID:this.userId,
              AMOUNT:formdata.coins
            }

            this.limits.PayCash(data).subscribe(resp=>{
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
