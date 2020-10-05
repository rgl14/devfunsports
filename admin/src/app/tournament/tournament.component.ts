import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { SportDataService } from '../services/sport-data.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  
  marketCtlgData = [];
  constructor(private sportService: SportDataService) { }

  ngOnInit() {
    this.getMarketCtlg()
  }

  getMarketCtlg() {
    $("#loading").css("display", "flex");
    this.sportService.GetMarketCtlg().subscribe(data => {
      $("#loading").css("display", "none");
      this.marketCtlgData = data.data;
      console.log(this.marketCtlgData);
    })
  }

}
