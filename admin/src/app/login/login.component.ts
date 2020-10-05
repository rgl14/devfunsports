import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { TokenService } from "../services/token.service";
import { NotificationService } from "../shared/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  submitted = false;

  // @Output() isLoggedIn = new EventEmitter<any>();

  loginForm: FormGroup;
  show: boolean;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private notifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initLoginForms();
    this.show = false;
  }

  initLoginForms() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      pwd: ["", Validators.required],
      context: [""],
      MachineId: [""],
      imeiAddress: [""],
      mobModelBrowserVers: [""],
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.Login(this.loginForm.value).subscribe((data) => {
      console.log(data);
      if (data.description.status == "Success") {
        this.notifyService.success(data.description.result);
        this.tokenService.setToken(data.response.AuthToken);
        this.tokenService.setUserType(data.type);
        this.loginForm.reset();
        // this.isLoggedIn.emit(true);
        this.router.navigateByUrl("home");
      } else {
        this.notifyService.error(data.description.result);
      }
    });
  }
}
