import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SportDataService } from "../services/sport-data.service";
import { NotificationService } from "../shared/notification.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-create-package",
  templateUrl: "./create-package.component.html",
  styleUrls: ["./create-package.component.css"],
})
export class CreatePackageComponent implements OnInit {
  savePackageForm: FormGroup;

  packageId: number;

  constructor(
    private fb: FormBuilder,
    private sportService: SportDataService,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.packageId = params.packageId;
    });
  }

  ngOnInit() {
    this.initSavePackageForm();
    if (this.packageId) {
      this.GetMktSettingsPackage();
    }
  }

  initSavePackageForm() {
    this.savePackageForm = this.fb.group({
      betBeforeInplayMins: [
        "",
        [Validators.required, Validators.min(1), Validators.max(1440)],
      ],
      betDelay: [
        "",
        [Validators.required, Validators.min(1), Validators.max(60)],
      ],
      isCheckVol: [false, Validators.required],
      isUnMatched: [false, Validators.required],
      maxLoss: [
        "",
        [Validators.required, Validators.min(1), Validators.max(10000000000)],
      ],
      maxProfit: [
        "",
        [Validators.required, Validators.min(1), Validators.max(10000000000)],
      ],
      expoLimit: [
        "",
        [Validators.required, Validators.min(0), Validators.max(10000000000)],
      ],
      maxRate: [
        "",
        [Validators.required, Validators.min(1.01), Validators.max(1000.0)],
      ],
      maxStake: [
        "",
        [Validators.required, Validators.min(1), Validators.max(10000000000)],
      ],
      minRate: [
        "",
        [Validators.required, Validators.min(1.01), Validators.max(100.0)],
      ],
      minStake: [
        "",
        [Validators.required, Validators.min(1), Validators.max(10000000000)],
      ],
      mktBeforeInplayStake: [
        "",
        [Validators.required, Validators.min(1), Validators.max(10000000000)],
      ],
      mktVolMulti: [
        "",
        [Validators.required, Validators.min(1), Validators.max(10000000000)],
      ],
      name: ["", Validators.required],
      userId: ["1"],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.savePackageForm.controls;
  }

  GetMktSettingsPackage() {
    this.sportService
      .GetMktSettingsPackage(this.packageId)
      .subscribe((data) => {
        console.log(data);
        data = data.data;
        this.savePackageForm.controls["betBeforeInplayMins"].setValue(
          data.betBeforeInplayMins
        );
        this.savePackageForm.controls["betDelay"].setValue(data.betDelay);
        this.savePackageForm.controls["isCheckVol"].setValue(
          data.isCheckVol == 0 ? false : true
        );
        this.savePackageForm.controls["isUnMatched"].setValue(
          data.isUnMatched == 0 ? false : true
        );
        this.savePackageForm.controls["maxLoss"].setValue(data.maxLoss);
        this.savePackageForm.controls["maxProfit"].setValue(data.maxProfit);
        this.savePackageForm.controls["expoLimit"].setValue(data.expoLimit);
        this.savePackageForm.controls["maxRate"].setValue(data.maxRate);
        this.savePackageForm.controls["maxStake"].setValue(data.maxStake);
        this.savePackageForm.controls["minRate"].setValue(data.minRate);
        this.savePackageForm.controls["minStake"].setValue(data.minStake);
        this.savePackageForm.controls["mktBeforeInplayStake"].setValue(
          data.mktBeforeInplayStake
        );
        this.savePackageForm.controls["mktVolMulti"].setValue(data.mktVolMulti);
        this.savePackageForm.controls["name"].setValue(data.name);
        this.savePackageForm.controls["userId"].setValue(data.userId);
      });
  }

  saveMarketsSettingPackageData() {
    console.log(this.savePackageForm);

    if (this.savePackageForm) {
      let saveMarketsData = {
        betBeforeInplayMins: this.savePackageForm.value.betBeforeInplayMins,
        betDelay: this.savePackageForm.value.betDelay,
        isCheckVol: this.savePackageForm.value.isCheckVol ? "1" : "0",
        isUnMatched: this.savePackageForm.value.isUnMatched ? "1" : "0",
        maxLoss: this.savePackageForm.value.maxLoss,
        maxProfit: this.savePackageForm.value.maxProfit,
        expoLimit: this.savePackageForm.value.expoLimit,
        maxRate: this.savePackageForm.value.maxRate,
        maxStake: this.savePackageForm.value.maxStake,
        minRate: this.savePackageForm.value.minRate,
        minStake: this.savePackageForm.value.minStake,
        mktBeforeInplayStake: this.savePackageForm.value.mktBeforeInplayStake,
        mktVolMulti: this.savePackageForm.value.mktVolMulti,
        name: this.savePackageForm.value.name,
        userId: this.savePackageForm.value.userId,
      };

      // console.log(saveMarketsData);

      this.sportService.SaveMktSettingPackage(saveMarketsData).subscribe(
        (data) => {
          console.log(data);
          if (data.status == "Success") {
            this.notifyService.success(data.result);

            this.savePackageForm.reset();
            setTimeout(() => {
              this.router.navigate(["/packages"]);
            }, 2000);
          } else {
            this.notifyService.error(data.result);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
