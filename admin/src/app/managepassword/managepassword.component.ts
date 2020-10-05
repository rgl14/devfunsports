import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../shared/must-match.validator";
import { UsermanagementService } from "../services/usermanagement.service";
import { NotificationService } from "../shared/notification.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedataService } from "../services/sharedata.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-managepassword",
  templateUrl: "./managepassword.component.html",
  styleUrls: ["./managepassword.component.css"],
})
export class ManagepasswordComponent implements OnInit {
  managepassword: FormGroup;
  submitted: boolean = false;
  userId: string;
  accountInfo: any;
  userName: string;
  name: string;
  constructor(
    private usermanagement: UsermanagementService,
    private formbuilder: FormBuilder,
    public notification: NotificationService,
    private route: ActivatedRoute,
    private sharedata: SharedataService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.name = this.route.snapshot.paramMap.get("name");
    this.userName = this.route.snapshot.paramMap.get("userName");
    this.managepassword = this.formbuilder.group({
      // oldpassword:['',Validators.required],
      newpassword: ["", Validators.required],
      yourpassword: ["", Validators.required],
    });

    this.sharedata.AccountInfoSource.subscribe((data) => {
      if (data != null) {
        this.accountInfo = data;
      }
    });
  }

  get f() {
    return this.managepassword.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.managepassword.invalid) {
      return;
    } else {
      var changepassworddata = this.managepassword.value;
      console.log(changepassworddata);
      var data = {
        changebyPwd: changepassworddata.yourpassword,
        context: "web",
        newPwd: changepassworddata.newpassword,
        userId: this.userId,
      };
      console.log(data);
      this.usermanagement.getResetPwd(data).subscribe((resp) => {
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          this._location.back();
        } else {
          this.notification.error(resp.result);
        }
      });
    }
  }
}
