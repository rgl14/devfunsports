import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { UsermanagementService } from '../services/usermanagement.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  rules: string;
  terms: string;

  constructor(private usermanagement:UsermanagementService,public notification:NotificationService,private _location: Location) { }
  public setContent(data) {
    this.rules = data.rules;
    this.terms = data.termsNconditions;
  }
  public editorConfig: any = {
    forceEnterMode: true,
    height: 250
  };
  ngOnInit() {
    this.getRules();
  }

  getRules() {
    this.usermanagement.getRulesReggulations().subscribe(
      data => {
        if (data.description.status == "Success") {
          console.log(data);
          this.setContent(data.data);
            this.rules = data.data.rules;
            this.terms = data.data.termsNconditions;
        }
      },
    );
  }

  backClicked() {
    this._location.back();
  }

  saveRules() {
    const Rules = {
      rules: this.rules,
      termsNconditions: this.terms
    };
    this.usermanagement.getSaveRulesNCodition(Rules).subscribe(
      data => {
        if (data.status == "Success") {
          this.notification.success(data.result);
          this.getRules();
        } else {
          this.notification.error(data.result);
        }
      },
    );
  }

}
