import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.css']
})
export class AgentlistComponent implements OnInit {
  userType: string;

  constructor(private tokenService: TokenService,) { }

  ngOnInit() {
    this.userType=this.tokenService.getUserType();
  }

}
