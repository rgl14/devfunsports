import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable, observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SportDataService } from '../services/sport-data.service';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import _ from 'lodash';
import { event, param } from 'jquery';
import { BetreportsService } from '../services/betreports.service';
import { betSearchInput, marketSearchData } from '../classes/userobjects';
import { DatePipe } from '@angular/common';
import { Item } from 'angular2-multiselect-dropdown';
import { GridOptions } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-betreport',
  templateUrl: './betreport.component.html',
  styleUrls: ['./betreport.component.css']
})
export class BetreportComponent implements OnInit {

  gridOption:GridOptions;
  rowData = [];
  gridLoadingOverlay:string;
  noRowTemplate:string;

  sportList = [];
  selectedSports = [];
  dropDownSettings = {};
  singleSelectDropDownSettings = {};

  marketList = [];
  selectedMarket = [];

  eventList = [];
  selectedEvent = [];

  searchedEventData:any;

  minDate:Date = null;
  maxDate:Date = null;
  minEndDate:Date = null;
  maxStartDate:Date = null;
  eventBinded:boolean = false;
  marketBinded:boolean = false;
  userList = [];
  filteredUser: any;
  fuserList = new FormControl();

  filteredMarkets = [];
  filteredEvents = [];

  formData:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private SportData:SportDataService,
    private betService:BetreportsService,
    private datePipe:DatePipe,
    private spinner:NgxSpinnerService,
  ) { 
    this.GetSportsList();
    this.gridOption = <GridOptions>{};
    this.gridOption = {
      context : {
        componentParent: this,
      },
    };

    this.gridOption ={
      
    }
    this.gridOption.columnDefs = [
      {headerName: 'Bet ID', field: 'bId', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 80, width: 80},
      {headerName: 'User', field: 'uName', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 100, width: 100},
      {headerName: 'Market', field: 'marName', tooltipValueGetter:function (params) { return (params.data.spName + " > " + params.data.mName + " > "+ params.data.marName) }, valueFormatter:function(params){ return (params.data.spName + " > " + params.data.mName + " > "+ params.data.marName)}, resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 150, width: 250},
      {headerName: 'Selection', field: 'runName', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 150, width: 150},
      {headerName: 'Type', field: 'backLay', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 80, width: 80, cellClass: function(params){ return (params.value === 'Lay' ? 'loss':'profit')}},
      {headerName: 'Stake', field: 'stake', valueFormatter: numberWithCommas, resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 80, width: 100, cellStyle:{'display':'block','text-align':'right'}},
      {headerName: 'P|L', field: 'pnl', valueFormatter: numberWithCommas, resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 80, width: 100, cellStyle:{'display':'block','text-align':'right'}, cellClass: function(params){ return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Bet Time', field: 'bTime', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 150, width: 150},
      {headerName: 'Odds', field: 'odd', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 60, width: 60, cellStyle:{'display':'block','text-align':'right'}},
      {headerName: 'Agent', field: 'agName', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 50, width: 100},
      {headerName: 'Master', field: 'msName', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 50, width: 100},
      {headerName: 'Super Master', field: 'supMsName', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 50, width: 100},
      {headerName: 'Double Super Master', field: 'doSupMsName', resizable: true, sortable: true, suppressSizeToFit: true, minWidth: 50, width: 100},
    ];

    function numberWithCommas(params) {
      var twodecimalvalue = parseFloat(params.value);
      var ans = twodecimalvalue.toLocaleString("en-IN", {
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return ans;
    }

    this.gridLoadingOverlay = '<span class="ag-overlay-loading-center">Please wait loading..</span>';
    this.noRowTemplate = '<span class="ag-overlay-loading-center">NO DATA</span>';
    this.gridOption.paginationPageSize = 50;
  }

  ngOnInit() {
    this.dropDownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.singleSelectDropDownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      closeDropDownOnSelection: true,
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();

    this.maxDate = new Date();
    this.maxStartDate = this.maxDate;
    this.minDate = new Date(currentYear, currentMonth, currentDay - 29);
    this.minEndDate = this.minDate;

    this.formData = this.formBuilder.group({
      betType:new FormControl('1', Validators.required),
      sportId:new FormControl(this.selectedSports, Validators.required),
      startDate:new FormControl(new Date(currentYear, currentMonth, currentDay - 7), Validators.required),
      endDate:new FormControl(this.maxDate, Validators.required),
      eventId:new FormControl(this.selectedEvent, Validators.required),
      marketId:new FormControl(this.selectedMarket, Validators.required),
      user:new FormControl('', Validators.required),
    });

    this.filteredUser = this.formData.get("user").valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.GetEventAndMarketList(this.formData.get("startDate").value, this.formData.get("endDate").value, 'ALL');
  }

  private _filter(value: string) {
    const filterValue = value.toString().toLowerCase();

    return this.userList.filter(option => option.userName.toLowerCase().includes(filterValue));
  }

  get form() { return this.formData.controls; }

  private GetSportsList(){
    this.SportData.GetSportList().subscribe(resp => {

      _.forEach(resp.tickerList,(item, index) => {
        this.sportList = this.sportList.concat({item_id: item.betfairId, item_text: item.sportName});
        this.selectedSports = this.selectedSports.concat({item_id: item.betfairId, item_text: item.sportName});
      });

      this.SetFormValues("sportId", this.selectedSports);
    });
  }

  Submit = function(){
    this.gridOption.api.showLoadingOverlay();
    this.rowData = [];

    let tempSelectedUser = this.userList.filter(filterItem => filterItem.userName === this.formData.get("user").value);
    let tempSelectedMarket:string = '';

    if(this.formData.get("marketId").value.length === this.marketList.length){
      tempSelectedMarket = 'All';
    }
    else{
      _.forEach(this.formData.get("marketId").value, (item, index) =>{
        tempSelectedMarket += item.item_id + "$";
      });

      tempSelectedMarket = tempSelectedMarket.slice(0, (tempSelectedMarket.length-1));
    }
    

    let requestData:betSearchInput = {
      filter: this.formData.get("betType").value,
      userId: tempSelectedUser[0].userId,
      marketId: tempSelectedMarket
    };

    this.betService.GetBetReport(requestData).subscribe(data => {

      if(data.description.status === "Success"){
        this.rowData = data.bets;
        this.gridOption.api.hideOverlay();
      }
    });
  }

  onSportSelect(item:any){
    this.rowData = [];
    this.GetEventAndMarketList(this.formData.get("startDate").value, this.formData.get("endDate").value);
  }

  onSportSelectAll(items:any){
    this.rowData = [];
    this.GetEventAndMarketList(this.formData.get("startDate").value, this.formData.get("endDate").value, 'ALL');
  }

  onSportDeSelect(item:any){
    this.rowData = [];
    this.eventList = this.eventList.filter(filterItem => filterItem.item_parent !== item.item_id);
    this.RemoveEventBySport(item.item_id);

    if(this.eventList.length === 0){
      this.eventBinded = false;
    }

    if(this.marketList.length === 0){
      this.marketBinded = false;
    }
  }

  private RemoveEventBySport(SportId:string){
    this.rowData = [];
    let removeEvent = this.filteredEvents.filter(filterItem => filterItem.SportId === SportId);
    this.selectedEvent = this.formData.get("eventId").value;

    _.forEach(removeEvent, (item, index) => {
      this.selectedEvent = this.selectedEvent.filter(filterItem => filterItem.item_id !== item.EventId);
      
      this.marketList = this.marketList.filter(filterItem => filterItem.item_parent !== item.EventId);
      this.RemoveMarketByEvent(item.EventId);
    });

    this.SetFormValues("eventId", this.selectedEvent);
  }

  onSportDeSelectAll(items:any){
    this.rowData = [];
    this.ResetEvent();
  }

  private SetFormValues(controlName:string, value:any){
    this.formData.controls[controlName].setValue(value);
  }

  private ResetEvent(){
    this.filteredEvents = [];
    this.filteredMarkets = [];
    this.eventList = [];
    this.selectedEvent = [];
    this.eventBinded = false;
    this.selectedSports = [];
    this.SetFormValues("eventId", this.selectedEvent);

    this.ResetMarket();
  }

  private ResetMarket(){
    this.marketList = [];
    this.selectedMarket = [];
    this.marketBinded = false;
    this.SetFormValues("marketId", this.selectedMarket);
  }

  onEventSelect(item:any){
    this.rowData = [];
    let tempList = this.filteredMarkets.filter(filterItem => filterItem.EventId === item.item_id);

    _.forEach(tempList, (item, index) => {
      this.marketList = this.marketList.concat({item_id: item.MarketId, item_text: item.MarketName, item_parent: item.EventId});
    });

    this.marketBinded = true;
  }

  onAllEventSelect(items:any){
    this.rowData = [];
    this.marketList = [];
    _.forEach(this.filteredMarkets, (item, index) => {
      this.marketList = this.marketList.concat({item_id: item.MarketId, item_text: item.MarketName, item_parent: item.EventId});
    });

    this.marketBinded = true;
  }

  onEventDeSelectAll(items:any){
    this.rowData = [];
    this.ResetMarket();
  }

  onEventDeSelect(item:any){
    this.marketList = this.marketList.filter(filterItem => filterItem.item_parent !== item.item_id);
    this.RemoveMarketByEvent(item.item_id);
    
    if(this.marketList.length === 0){
      this.marketBinded = false;
    }
  }

  private RemoveMarketByEvent(EventId:string){
    this.rowData = [];
    let removeMarkets = this.filteredMarkets.filter(filterItem => filterItem.EventId === EventId);
    this.selectedMarket = this.formData.get("marketId").value;

    _.forEach(removeMarkets, (item, index) =>{
      this.selectedMarket = this.selectedMarket.filter(filterItem => filterItem.item_id !== item.MarketId);
    });

    this.SetFormValues("marketId", this.selectedMarket);
  }

  UpdateMinDates(event:MatDatepickerInputEvent<Date>){
    let selectedDate = new Date(event.value);
    this.minEndDate = selectedDate;
    let tempSelectedSportId:string = '';

    this.GetEventAndMarketList(selectedDate, this.formData.get("endDate").value);
  }

  UpdateMaxDates(event:MatDatepickerInputEvent<Date>){
    let selectedDate = new Date(event.value);
    this.maxStartDate = selectedDate;
    let tempSelectedSportId:string = '';

    this.GetEventAndMarketList(this.formData.get("startDate").value, selectedDate);
  }

  private GetEventAndMarketList(startDate:Date, endDate:Date, selectionType?:string){

    this.rowData = [];
    this.spinner.show();
    this.ResetEvent();

    let sportId:string = '';

    if(selectionType === undefined){
      _.forEach(this.formData.get("sportId").value, (item, index) => {
        sportId += item.item_id + ",";
      });
  
      sportId = sportId.slice(0, (sportId.length - 1));
    }

    let filterData:marketSearchData = {
      sports: sportId,
      fromDate: this.datePipe.transform(startDate, 'dd-MMM-yyyy'),
      toDate:  this.datePipe.transform(endDate, 'dd-MMM-yyyy'),
    };

    this.betService.GetEventAndUser(filterData).subscribe(data => {

      if(data.description.status == "Success")
      {
        this.filteredEvents = data.events;
        this.filteredMarkets = data.markets;
        this.eventList = [];
        this.userList = [];

        _.forEach(data.events, (item, index) => {
          this.eventList = this.eventList.concat({item_id: item.EventId, item_text: item.EventName, item_parent: item.SportId});
        });

        let tempUsers = [];
        _.forEach(data.users, (item, index) => {
          tempUsers.push({userName: item.userName, userId: item.userId});
        });

        this.userList = tempUsers;
        this.formData.controls["user"].setValue('');
      }
      this.eventBinded = true;
      this.spinner.hide();
    });
  }

}
