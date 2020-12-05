import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { NotificationService } from "../shared/notification.service";
import { MustMatch } from "../shared/must-match.validator";
import { UsermanagementService } from "../services/usermanagement.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedataService } from "../services/sharedata.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-createsuper",
  templateUrl: "./createsuper.component.html",
  styleUrls: ["./createsuper.component.css"],
})
export class CreatesuperComponent implements OnInit {
  supermasterform: FormGroup;
  submitted = false;
  isdisabled: boolean = false;
  accountInfo: any;
  userId: any;
  maxsupershare: number;
  totalremaininglimit: number = 0;
  edituserdata: any;
  ismatchcomm: number;
  issessioncomm: number;
  userdata: any;
  usertype: number;
  iscommissionedit: boolean;
  isUsernameAvail: boolean = false;

  constructor(
    private usermanagement: UsermanagementService,
    private formbuilder: FormBuilder,
    public notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedata: SharedataService,
    private _location: Location
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("userId");
    if (this.userId) {
      this.isdisabled = true;
    }
    this.supermasterform = this.formbuilder.group(
      {
        username: [
          { value: "", disabled: this.isdisabled },
          Validators.required,
        ],
        firstName: ["", Validators.required],
        fixLimit: [
          { value: 0, disabled: this.isdisabled },
          Validators.required,
        ],
        expoLimit: ["", Validators.required],
        Supershare: [{ value: "", disabled: true }, Validators.required],
        myShare: [{ value: "", disabled: this.isdisabled }, Validators.required],
        MComm: ["2", Validators.required],
        SComm: ["0", Validators.required],
        MloseComm: ["0", Validators.required],
        SloseComm: ["0", Validators.required],
        fixedfees: ["0"],
        bookdisplaytype: [""],
        password: [
          { value: "", disabled: this.isdisabled },
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: [
          { value: "", disabled: this.isdisabled },
          Validators.required,
        ],
        // isMComm: false,
        // isSComm: false,
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
    this.accountInfo = "";
    this.usermanagement.getAccountInfo().subscribe((data) => {
      this.accountInfo = data.data;
      this.supermasterform.controls["bookdisplaytype"].setValue(
        this.accountInfo.bookDisplayType.toString()
      );
    });
    this.sharedata.AccountInfoSource.subscribe((data) => {
      if (data != null) {
        if (data.userType != 1) {
          this.iscommissionedit = true;
          this.supermasterform.get("expoLimit").clearValidators();
          this.supermasterform.get("MComm").clearValidators();
        } else {
          this.iscommissionedit = false;
        }
        // console.log(data)
        if (this.userId) {
          this.getuserdata();
          this.isdisabled = true;
        } else {
          this.usertype = 3;
          // this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
          //   this.supermasterform.controls['username'].setValue(resp.userName);
          // })
          this.formControlfixlimitChanged();
        }
        // this.formControlsmaxsharechanged()
        this.formControlsmysharechanged();
        this.formControlmcommchanged();
        this.formControlscommchanged();
        this.formControlmLossingCommchanged();
        this.formControlsLossingCommCommchanged();
      }
    });
  }
  onClear() {
    // this.submitted = false;
    this.supermasterform.reset();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.supermasterform.controls;
  }

  ValidateUsername() {
    if (this.userId) {
      return;
    }
    if (this.supermasterform.value.username) {
      this.usermanagement
        .ValidateUsername(this.supermasterform.value.username)
        .subscribe(
          (resp) => {
            this.isUsernameAvail = resp.result;
          },
          (err) => {
            this.notification.error(err.error.description.result);
          }
        );
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.supermasterform.invalid) {
      return;
    } else {
      // console.log(this.supermasterform)
      if (this.userId) {
        this.edituserdata = this.supermasterform.value;
        // console.log(this.edituserdata)
        // if(this.edituserdata.isMComm){
        //   this.ismatchcomm=1;
        // }else{
        //   this.ismatchcomm=0;
        // }
        // if(this.edituserdata.isSComm){
        //   this.issessioncomm=1;
        // }else{
        //   this.issessioncomm=0;
        // }
        var editusersdata = {
          MComm: this.supermasterform.get("MComm").value,
          SComm: this.supermasterform.get("SComm").value,
          agentShare: this.supermasterform.get("Supershare").value,
          context: "web",
          firstName: this.edituserdata.firstName,
          fixLimit: this.supermasterform.get("fixLimit").value,
          expoLimit: this.supermasterform.get("expoLimit").value,
          fixFees: this.edituserdata.fixedfees,
          isMComm: 0,
          isSComm: 0,
          myShare: this.edituserdata.myShare,
          bookDisplayType: this.edituserdata.bookdisplaytype,
          commType: 1,
          mLossingComm: this.supermasterform.get("MloseComm").value,
          sLossingComm: this.supermasterform.get("SloseComm").value,
          userID: this.userId,
        };
        // console.log(editusersdata,"EDITuserdata")
        this.usermanagement.getEditUserData(editusersdata).subscribe((resp) => {
          if (resp.status == "Success") {
            this.notification.success(resp.result);
            this._location.back();
          } else {
            this.notification.error(resp.result);
          }
        });
      } else {
        this.userdata = this.supermasterform.value;
        // console.log(this.userdata)
        if (this.userdata.MComm === "" && this.iscommissionedit === true) {
          var matchComm: any = this.accountInfo.matchComm;
        } else if (
          (this.userdata.MComm === "" || this.userdata.MComm === null) &&
          this.iscommissionedit === false
        ) {
          var matchComm: any = 0;
        } else {
          var matchComm: any = this.userdata.MComm;
        }
        if (this.userdata.fixedfees === "" && this.iscommissionedit === true) {
          var fixedfeess: any = this.accountInfo.fixFees;
        } else if (
          (this.userdata.fixedfees === "" ||
            this.userdata.fixedfees === null) &&
          this.iscommissionedit === false
        ) {
          var fixedfeess: any = 0;
        } else {
          var fixedfeess: any = this.userdata.fixedfees;
        }
        if (this.userdata.bookdisplaytype == "") {
          var bookdisplay = this.accountInfo.bookDisplayType;
        } else {
          var bookdisplay = this.userdata.bookdisplaytype;
        }
        // if(this.userdata.isMComm){
        //   this.ismatchcomm=1;
        // }else{
        //   this.ismatchcomm=0;
        // }
        // if(this.userdata.isSComm){
        //   this.issessioncomm=1;
        // }else{
        //   this.issessioncomm=0;
        // }
        var data = {
          userName: this.supermasterform.get("username").value,
          MComm:
            this.iscommissionedit === false
              ? this.userdata.MComm
              : this.accountInfo.matchComm,
          SComm: this.supermasterform.get("SComm").value,
          agentShare: this.supermasterform.get("Supershare").value,
          context: "web",
          firstName: this.userdata.firstName,
          fixLimit: this.userdata.fixLimit,
          expoLimit:
            this.iscommissionedit === false
              ? this.userdata.expoLimit
              : this.accountInfo.expoLimit,
          fixFees: fixedfeess,
          isMComm: 0,
          isSComm: 0,
          myShare: this.userdata.myShare,
          password: this.userdata.password,
          bookDisplayType: bookdisplay,
          commType: 1,
          mLossingComm: this.supermasterform.get("MloseComm").value,
          sLossingComm: this.supermasterform.get("SloseComm").value,
          userType: 3,
        };
        // console.log(data,"userdata")
        this.usermanagement.getCreatUser(data).subscribe((resp) => {
          if (resp.status == "Success") {
            this.notification.success(resp.result);
            this._location.back();
          } else {
            this.notification.error(resp.result);
          }
        });
      }
    }
    // if (this.service.form.valid) {
    //   this.service.form.reset();
    //   this.service.initializeFormGroup();

    // }
  }

  formControlsmysharechanged() {
    this.supermasterform.get("myShare").valueChanges.subscribe((mode: any) => {
      if (mode > this.accountInfo.maxMyShare) {
        this.supermasterform.controls["myShare"].setValue(
          this.accountInfo.maxMyShare
        );
      } else {
        let myshare = this.accountInfo.maxMyShare - mode;
        this.supermasterform.controls["Supershare"].setValue(myshare);
      }
    });
  }
  // formControlsmaxsharechanged(){
  //   this.supermasterform.get('Supershare').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.CompanyShare){
  //           this.supermasterform.controls['Supershare'].setValue(this.accountInfo.CompanyShare)
  //         }else{
  //           let maxshare = this.accountInfo.minCompanyShare-mode;

  //         }
  //   });
  // }
  formControlfixlimitChanged() {
    this.supermasterform.get("fixLimit").valueChanges.subscribe((mode: any) => {
      if (mode > parseInt(this.accountInfo.remainingLimit)) {
        this.totalremaininglimit = parseInt(this.accountInfo.remainingLimit);
        if(parseInt(this.accountInfo.remainingLimit)>0){
          this.supermasterform.get('fixLimit').setValue(this.accountInfo.remainingLimit, {emitEvent: false});
        }else{
          this.totalremaininglimit = 0;
          this.supermasterform.get('fixLimit').setValue(0, {emitEvent: false});
        }
      }else{
        this.totalremaininglimit = mode;
      }
    });
  }
  formControlmcommchanged() {
    this.supermasterform.get("MComm").valueChanges.subscribe((mode: number) => {
      if (this.iscommissionedit) {
        if (mode > this.accountInfo.matchComm) {
          this.supermasterform.controls["MComm"].setValue(
            this.accountInfo.matchComm
          );
        }
      } else {
        if (mode > 100) {
          this.supermasterform.controls["MComm"].setValue(100);
        }
      }
    });
  }
  formControlscommchanged() {
    this.supermasterform.get("SComm").valueChanges.subscribe((mode: any) => {
      if (this.iscommissionedit) {
        if (mode > this.accountInfo.sessionComm) {
          this.supermasterform.controls["SComm"].setValue(
            this.accountInfo.sessionComm
          );
        }
      } else {
        if (mode > 100) {
          this.supermasterform.controls["SComm"].setValue(100);
        }
      }
    });
  }
  formControlmLossingCommchanged() {
    this.supermasterform
      .get("MloseComm")
      .valueChanges.subscribe((mode: any) => {
        if (this.iscommissionedit) {
          if (mode > this.accountInfo.mLossingComm) {
            this.supermasterform.controls["MloseComm"].setValue(
              this.accountInfo.mLossingComm
            );
          }
        } else {
          if (mode > 100) {
            this.supermasterform.controls["MloseComm"].setValue(100);
          }
        }
      });
  }
  formControlsLossingCommCommchanged() {
    this.supermasterform
      .get("SloseComm")
      .valueChanges.subscribe((mode: any) => {
        if (this.iscommissionedit) {
          if (mode > this.accountInfo.sLossingComm) {
            this.supermasterform.controls["SloseComm"].setValue(
              this.accountInfo.sLossingComm
            );
          }
        } else {
          if (mode > 100) {
            this.supermasterform.controls["SloseComm"].setValue(100);
          }
        }
      });
  }

  getuserdata() {
    this.usermanagement.getUserInfo(this.userId).subscribe((resp) => {
      // console.log(resp.data)
      // if(resp.data.isMComm==1){
      //   var mcomm=true;
      // }else{
      //   var mcomm=false;
      // }
      // if(resp.data.isSComm==1){
      //   var scomm=true;
      // }else{
      //   var scomm=false;
      // }
      this.maxsupershare = this.accountInfo.minCompanyShare - resp.data.myShare;
      this.supermasterform.setValue({
        username: resp.data.userName,
        firstName: resp.data.name,
        fixLimit: resp.data.fixLimit,
        expoLimit: resp.data.expoLimit,
        Supershare: this.maxsupershare,
        myShare: resp.data.myShare,
        MComm:
          this.iscommissionedit === false
            ? resp.data.mComm
            : this.accountInfo.matchComm,
        SComm: resp.data.sComm,
        MloseComm: resp.data.mLossingComm,
        SloseComm: resp.data.sLossingComm,
        fixedfees: resp.data.fixFees,
        bookdisplaytype: resp.data.bookDisplayType.toString(),
        password: "123456",
        confirmPassword: "123456",
        // isMComm: mcomm,
        // isSComm: scomm,
      });
    });
  }

  onCancel() {
    this._location.back();
  }
}
