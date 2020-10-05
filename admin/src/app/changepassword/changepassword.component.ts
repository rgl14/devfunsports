import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changepassword:FormGroup;
  submitted:boolean=false;
  constructor(private formbuilder : FormBuilder,
    public notification:NotificationService,
    private usermanagement:UsermanagementService
    ) { }

  ngOnInit() {
    this.changepassword=this.formbuilder.group({
      oldpassword:['',Validators.required],
      newpassword:['',Validators.required],
      confirmpassword:['',Validators.required],
    }, {
      validator: MustMatch('newpassword', 'confirmpassword')
    })
  }
  get f() { return this.changepassword.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changepassword.invalid) {  
      return;
    }else{
      var changepassworddata=this.changepassword.value;
      var data={
        "context":"web",
        "oldPwd":changepassworddata.oldpassword,
        "newPwd":changepassworddata.newpassword
      }
      console.log(data)
      this.usermanagement.changePassword(data).subscribe(resp=>{
        if(resp.status=='Success'){
          this.notification.success(resp.result);
        }else{
          this.notification.error(resp.result);
        }
      })
  }    
  }
}
