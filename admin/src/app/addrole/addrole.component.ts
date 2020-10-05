import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { UserrolesService } from '../services/userroles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {

  addroleform:FormGroup;
  submitted=false;
  formdata: any;
  roleId: string;
  constructor(
    private formbuilder:FormBuilder,
    private userroles:UserrolesService,
    private router:Router,
    private route:ActivatedRoute,
    private notifyService:NotificationService,
    private _location: Location
      ) { }

  ngOnInit() {
    this.roleId=this.route.snapshot.paramMap.get('roleId');
    if(this.roleId){
      this.getRoleInfobyid()
    }
    this.addroleform=this.formbuilder.group({
      rolename:['',Validators.required],
      roledesc:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.addroleform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addroleform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addroleform.invalid) {
            return;
        }else{
          if(this.roleId){
            this.formdata=this.addroleform.value;
          let data={
            "description":this.formdata.roledesc,
            "name":this.formdata.rolename,
              "permissions":{
                "isAccStatementView":1,
                "isAddCommentaryView":1,
                "isAdministrationView":1,
                "isBalanceDelete":1,
                "isBalanceEdit":1,
                "isBalanceView":1,
                "isBetAdd":1,
                "isBetEdit":1,
                "isBetView":1,
                "isBettingAdd":1,
                "isBettingDelete":1,
                "isBettingEdit":1,
                "isBettingView":1,
                "isCLBetHistoryView":1,
                "isChangePwdAdd":1,
                "isChangePwdDelete":1,
                "isChangePwdEdit":1,
                "isChangePwdView":1,
                "isChipStatementView":1,
                "isChipSummaryView":1,
                "isClientListingView":1,
                "isCommentaryAdd":1,
                "isCommentaryDelete":1,
                "isCommentaryEdit":1,
                "isCommentaryView":1,
                "isDashboardView":1,
                "isFancyAdd":1,
                "isFancyEdit":1,
                "isFancyView":1,
                "isGlobalSettingView":1,
                "isImportBetView":1,
                "isImportRateDelete":1,
                "isImportRateEdit":1,
                "isImportRateView":1,
                "isMasterView":1,
                "isMatchAdd":1,
                "isMatchEdit":1,
                "isMatchView":1,
                "isMktAnalysisView":1,
                "isNewsAdd":1,
                "isNewsDelete":1,
                "isNewsEdit":1,
                "isNewsView":1,
                "isReportDelete":1,
                "isReportEdit":1,
                "isReportView":1,
                "isRoleListAdd":1,
                "isRoleListEdit":1,
                "isRoleListView":1,
                "isSportAdd":1,
                "isSportEdit":1,
                "isSportView":1,
                "isTournamentAdd":1,
                "isTournamentEdit":1,
                "isTournamentView":1,
                "isUserListAdd":1,
                "isUserListEdit":1,
                "isUserListView":1,
                "isUserRolesView":1
              },
              "roleId":this.roleId
            }
            this.userroles.EditRole(data).subscribe(data=>{
              if (data.status == "Success") {
                this.notifyService.success(data.result);
                setTimeout(() => {
                  this.router.navigateByUrl('/rolelist')
                }, 2000)
              }else{
                this.notifyService.error(data.result);
              }
            })
          }else{
            this.formdata=this.addroleform.value;
          let data={
            "description":this.formdata.roledesc,
            "name":this.formdata.rolename,
            "permissions":{
              "isAccStatementView":1,
              "isAddCommentaryView":1,
              "isAdministrationView":1,
              "isBalanceDelete":1,
              "isBalanceEdit":1,
              "isBalanceView":1,
              "isBetAdd":1,
              "isBetEdit":1,
              "isBetView":1,
              "isBettingAdd":1,
              "isBettingDelete":1,
              "isBettingEdit":1,
              "isBettingView":1,
              "isCLBetHistoryView":1,
              "isChangePwdAdd":1,
              "isChangePwdDelete":1,
              "isChangePwdEdit":1,
              "isChangePwdView":1,
              "isChipStatementView":1,
              "isChipSummaryView":1,
              "isClientListingView":1,
              "isCommentaryAdd":1,
              "isCommentaryDelete":1,
              "isCommentaryEdit":1,
              "isCommentaryView":1,
              "isDashboardView":1,
              "isFancyAdd":1,
              "isFancyEdit":1,
              "isFancyView":1,
              "isGlobalSettingView":1,
              "isImportBetView":1,
              "isImportRateDelete":1,
              "isImportRateEdit":1,
              "isImportRateView":1,
              "isMasterView":1,
              "isMatchAdd":1,
              "isMatchEdit":1,
              "isMatchView":1,
              "isMktAnalysisView":1,
              "isNewsAdd":1,
              "isNewsDelete":1,
              "isNewsEdit":1,
              "isNewsView":1,
              "isReportDelete":1,
              "isReportEdit":1,
              "isReportView":1,
              "isRoleListAdd":1,
              "isRoleListEdit":1,
              "isRoleListView":1,
              "isSportAdd":1,
              "isSportEdit":1,
              "isSportView":1,
              "isTournamentAdd":1,
              "isTournamentEdit":1,
              "isTournamentView":1,
              "isUserListAdd":1,
              "isUserListEdit":1,
              "isUserListView":1,
              "isUserRolesView":1
            }
          }
          
          this.userroles.AddRole(data).subscribe(data=>{
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              setTimeout(() => {
                this.router.navigateByUrl('/rolelist')
              }, 2000)
            }else{
              this.notifyService.error(data.result);
            }
          })
          }
        }
  }

  getRoleInfobyid(){
    this.userroles.GetRoleInfobyId(this.roleId).subscribe(resp=>{
      console.log(resp.data)
      this.addroleform.controls['rolename'].setValue(resp.data.name);
      this.addroleform.controls['roledesc'].setValue(resp.data.description);
    })
  }

  onCancel() {
    this._location.back();
  }

}
