import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { Router } from '../../../../node_modules/@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @Input() user: User;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('#'+ "navbarBasicExample");
   
    burger.addEventListener('click', function(){
      burger.classList.toggle('is-active');
      nav.classList.toggle('is-active');
    });
  }

  signout() {
    this.auth.auth.signOut().then(x => {
      this.router.navigateByUrl("");
    });
  }
  
  closeNavbar() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('#'+ "navbarBasicExample");

    burger.classList.remove("is-active");
    nav.classList.remove("is-active");
  }

}
