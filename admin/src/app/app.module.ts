import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule, componentRouting } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ManageformService } from "./manageform.service";
import { AgGridModule } from "ag-grid-angular";
import {
  CustomcellbuttonsComponent,
  SetMatchLiveTvDialog,
  UpdatePackageDialog,
  SettleFancyDialog,
  RejectBetdialogcell,
  UpdateTossDialog,
  UpdateResultDialog,
  ShowPwdDialog,
  LimitsDialog,
  ShareDialog,
  PartialPaymentDialog,
} from "./customcellbuttons/customcellbuttons.component";
import { NavigationcellComponent } from "./navigationcell/navigationcell.component";
import {
  ButtontogglecellComponent,
  UserstatusDialog,
} from "./buttontogglecell/buttontogglecell.component";
import { RatesnavigationComponent } from "./ratesnavigation/ratesnavigation.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { TokenService } from "./services/token.service";
import {
  MainComponent,
  BottomSheetComponent,
  ConfirmBoxDialog,
} from "./main/main.component";
import { TokenInterceptor } from "./services/token-interceptor";
import { CelltextfieldComponent } from "./celltextfield/celltextfield.component";
import { CelldisabledtextfieldComponent } from "./celldisabledtextfield/celldisabledtextfield.component";
import { CelldisabledusedlimitComponent } from "./celldisabledusedlimit/celldisabledusedlimit.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { MarketCtlgComponent } from "./market-ctlg/market-ctlg.component";
import { UsermanagementService } from "./services/usermanagement.service";
import { SharedataService } from "./services/sharedata.service";
import { CustomsporttogglecellComponent } from "./customsporttogglecell/customsporttogglecell.component";
import { TournamenttogglecellComponent } from "./tournamenttogglecell/tournamenttogglecell.component";
import { MatchtogglecellComponent } from "./matchtogglecell/matchtogglecell.component";
import { MarkettogglecellComponent } from "./markettogglecell/markettogglecell.component";
import { CKEditorModule } from "ngx-ckeditor";
import { DatePipe } from "@angular/common";
import {
  SettingfancybookcellComponent,
  FancyBooksettingDialog,
} from "./settingfancybookcell/settingfancybookcell.component";
import { TickerService } from "./services/ticker.service";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { AnalysisFormatService } from "./services/analysis-format.service";
import { AnalysisSignalrService } from "./services/analysis-signalr.service";
import { FancySignalrService } from "./services/fancy-signalr.service";
import { MarketSignalrService } from "./services/market-signalr.service";
import { CellcurrentlimittextfeildComponent } from "./cellcurrentlimittextfeild/cellcurrentlimittextfeild.component";
import { RemoveSpacePipe } from "./Directives/removespacepipe";
import {
  FancyBookDialog,
  RejectBetdialog,
} from "./marketanalysis/marketanalysis.component";
import { SpecialCharacterDirective } from "./Directives/Special-character";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { InputRestrictionDirective } from "./Directives/specialcharInput";

import { BreadcrumbModule } from "angular-crumbs";
import { SharedModule } from "./shared/shared.module";
import {
  dpDialog,
  dWcomponent,
  wdDialog,
} from "./customcellbuttons/DWChild/dwchild.component";
import { AddadminFundsComponent } from './addadmin-funds/addadmin-funds.component';
import { ESDialog } from './collectionreport/collectionreport.component';

@NgModule({
  declarations: [
    AppComponent,
    BottomSheetComponent,
    HeaderComponent,
    SidebarComponent,
    componentRouting,
    CustomcellbuttonsComponent,
    NavigationcellComponent,
    ButtontogglecellComponent,
    UserstatusDialog,
    CustomsporttogglecellComponent,
    RatesnavigationComponent,
    CelltextfieldComponent,
    CelldisabledtextfieldComponent,
    CelldisabledusedlimitComponent,
    LoginComponent,
    MainComponent,
    SetMatchLiveTvDialog,
    UpdatePackageDialog,
    SettleFancyDialog,
    RejectBetdialogcell,
    UpdateTossDialog,
    UpdateResultDialog,
    TournamenttogglecellComponent,
    MatchtogglecellComponent,
    MarkettogglecellComponent,
    SettingfancybookcellComponent,
    FancyBooksettingDialog,
    CellcurrentlimittextfeildComponent,
    FancyBookDialog,
    RejectBetdialog,
    SpecialCharacterDirective,
    InputRestrictionDirective,
    ConfirmBoxDialog,
    dWcomponent,
    wdDialog,
    dpDialog,
    ShareDialog,
    LimitsDialog,
    ShowPwdDialog,
    AddadminFundsComponent,
    PartialPaymentDialog,
    ESDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    CKEditorModule,
    AngularMultiSelectModule,
    TimepickerModule.forRoot(),
    BreadcrumbModule,
    SharedModule,
  ],
  entryComponents: [
    BottomSheetComponent,
    CustomcellbuttonsComponent,
    NavigationcellComponent,
    ButtontogglecellComponent,
    UserstatusDialog,
    CustomsporttogglecellComponent,
    TournamenttogglecellComponent,
    MatchtogglecellComponent,
    MarkettogglecellComponent,
    RatesnavigationComponent,
    CelltextfieldComponent,
    CellcurrentlimittextfeildComponent,
    CelldisabledtextfieldComponent,
    CelldisabledusedlimitComponent,
    SetMatchLiveTvDialog,
    UpdatePackageDialog,
    SettleFancyDialog,
    SettingfancybookcellComponent,
    FancyBooksettingDialog,
    RejectBetdialogcell,
    UpdateTossDialog,
    UpdateResultDialog,
    ConfirmBoxDialog,
    dWcomponent,
    wdDialog,
    dpDialog,
    ShareDialog,
    LimitsDialog,
    ShowPwdDialog,
    PartialPaymentDialog,
    ESDialog
  ],
  providers: [
    ManageformService,
    DatePipe,
    CookieService,
    TokenService,
    UsermanagementService,
    TickerService,
    SharedataService,
    AnalysisFormatService,
    AnalysisSignalrService,
    FancySignalrService,
    MarketSignalrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
