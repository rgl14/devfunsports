import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../services/usermanagement.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userinfo: any;
  currency = environment.baseSite.currency;

  constructor(private usermanagement: UsermanagementService,) { }

  ngOnInit() {
    this.usermanagement.getAccountInfo().subscribe(data => {
      this.userinfo = data.data;
    })
  }

}
