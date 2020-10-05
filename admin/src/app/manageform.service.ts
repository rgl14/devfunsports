import { Injectable } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ManageformService {

  constructor() { }

form:FormGroup=new FormGroup({
  $key :new FormControl(null),
  username : new FormControl('',Validators.required),
  fullname : new FormControl('',Validators.required),
  myshare : new FormControl('',Validators.required),
  maxshare : new FormControl('',Validators.required),
  fixlimit : new FormControl(''),
  matchcommission : new FormControl(''),
  sessioncommission : new FormControl(''),
  password : new FormControl('',[Validators.required,Validators.minLength(5)]),
  confirmpassword : new FormControl('',[Validators.required,Validators.minLength(5)]),
})
initializeFormGroup() {
  this.form.setValue({
    $key: null,
    username : '',
    fullname :'',
    myshare : '',
    maxshare : '',
    fixlimit : '',
    matchcommission :'',
    sessioncommission : '', 
    password : '',
    confirmpassword : '',
  });
}
}
