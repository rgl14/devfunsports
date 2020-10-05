import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marketreport',
  templateUrl: './marketreport.component.html',
  styleUrls: ['./marketreport.component.css']
})
export class MarketreportComponent implements OnInit {
  title: string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
  }

}
