import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ratesnavigation',
  templateUrl: './ratesnavigation.component.html',
  styleUrls: ['./ratesnavigation.component.css']
})
export class RatesnavigationComponent implements OnInit {
  data: any;
  currentroute: any;

  constructor(private router: Router) {
    this.currentroute = this.router.url
  }

  agInit(params) {
    this.data = params.data;
    // console.log(this.data)
  }
  ngOnInit() {
  }
  getvalue(data: any) {
    console.log(data)
  }

  openRatePage() {
    // console.log(this.data);
    if(this.data.bookCode){
      window.open('BookRate.html?book_id=' + this.data.bookCode, '_blank');
    }
    if(this.data.fancyCode){
      window.open('FancyRate.html?f_id=' + this.data.fancyCode, '_blank');
    }
    if(this.data.matchId){
      this.router.navigateByUrl('/ScoreInput/'+this.data.matchId);
    }
  }

}
