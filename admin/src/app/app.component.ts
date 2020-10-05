import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin';
  currentroute: string;
  // title = 'AngularMaterialGettingStarted';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private tokenService: TokenService) {
    this.currentroute = this.router.url;
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  checkLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }


}
// isMenuOpen = true;
// contentMargin = 240;

// task: string[] = [
//   'Clearning out my closet', 'Take out trash bins', 'Wash car', 'Tank up the motorcycles', 'Go for flight training'
// ]

// onToolbarMenuToggle() {
//   console.log('On toolbar toggled', this.isMenuOpen);
//   this.isMenuOpen = !this.isMenuOpen;

//   if(!this.isMenuOpen) {
//     this.contentMargin = 70;
//   } else {
//     this.contentMargin = 240;
//   }
// }
// myFunction() {
//   var x = document.getElementById("myNavbar");
//   if (x.className === "navbar") {
//     x.className += " responsive";
//   } else {
//     x.className = "navbar";
//   }
// }


