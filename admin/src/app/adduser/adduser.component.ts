import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { UserrolesService } from '../services/userroles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  adduserform:FormGroup;
  roleslist:[];
  submitted=false;
  constructor(
    private formbuilder:FormBuilder,
    private notification:NotificationService,
    private userroles:UserrolesService,
    private router:Router,
    private route:ActivatedRoute,
    private _location: Location
    ) { }

  ngOnInit() {
    this.userroles.GetRolesList().subscribe(resp=>{
      console.log(resp);
      this.roleslist=resp.data
    })
    this.adduserform=this.formbuilder.group({
      admusername:['',Validators.required],
      admfullname:['',Validators.required],
      admpassword:['',Validators.required],
      admrolename:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.adduserform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.adduserform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.adduserform.invalid) {
            return;
        }else{

        }
  }

  onCancel() {
    this._location.back();
  }

}
