import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [
    RouterLink
  ]
})
export class Header {

  constructor(private router: Router) {}

  goToProfile() {
    const user = getAuth().currentUser;

    if (user) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
