import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsermanagementService } from '../services/usermanagement.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addadmin-funds',
  templateUrl: './addadmin-funds.component.html',
  styleUrls: ['./addadmin-funds.component.css']
})
export class AddadminFundsComponent implements OnInit {
  Adminfund: FormGroup;
  DepositAdminfunds: any;
  accountInfo: any;
  totaladminbalance: number;
  constructor(private fb: FormBuilder,private usermanagement: UsermanagementService,public notification: NotificationService,) { }

  ngOnInit() {
    this.AccountInfo();
    this.initAdminfundForm();
  }
  get f() {
    return this.Adminfund.controls;
  }
  get Depositfund() { return this.Adminfund.get('Depositfund') };
  initAdminfundForm() {
    this.Adminfund = this.fb.group({
      Depositfund: [0, [Validators.required]],
      remark: ['']
    })
    this.formControlDepositfundChanged();
  }
  AccountInfo() {
    this.usermanagement.getAccountInfo().subscribe((data) => {
      this.accountInfo = data.data;
      this.totaladminbalance=this.accountInfo.balance;
    });
  }
  formControlDepositfundChanged() {
    this.Adminfund.get('Depositfund').valueChanges.subscribe(
        (mode: any) => {
          this.DepositAdminfunds=mode;
          this.totaladminbalance=parseFloat(this.accountInfo.balance)+parseFloat(this.DepositAdminfunds)
    });
  }
  Addfunds(){
    if (!this.Adminfund.valid) {
      return;
    }
    let data={
      "amount":this.Adminfund.value.Depositfund,
      "remarks":this.Adminfund.value.remark
    }
    this.usermanagement.DefineAdminFunds(data).subscribe((resp) => {
      if (resp.status == "Success") {
        this.notification.success(resp.result);
        this.AccountInfo();
        this.onCancel();
      } else {
        this.notification.error(resp.result);
      }
    })
  }
  onCancel() {
    this.initAdminfundForm();
  }
}
