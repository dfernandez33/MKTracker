import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { Router } from '../../../../node_modules/@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  public loginFailed = false;
  public errorMessage: string;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.auth.auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.router.navigateByUrl("home");
      }
    })
   }

  login() {
    this.auth.auth.signInWithEmailAndPassword(this.email, this.password).then(x => {
      this.router.navigateByUrl("/home");
    })
    .catch(error => {
      this.loginFailed = true;
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        this.errorMessage = "The email address you entered was incorrect. Please try again!";
        this.email = undefined;
        this.password = undefined;
      } else if (errorCode === "auth/wrong-password") {
        this.errorMessage = "The password you entired is incorrect. Please try again!";
        this.password = undefined;
      } else if (errorCode === "auth/invalid-email") {
        this.errorMessage = "Please enter a valid email address and try again!";
        this.email = undefined;
        this.password = undefined;
      } else {
        this.errorMessage = "There was a problem signing you in. Please try again!";
        this.email = undefined;
        this.password = undefined;
      }
    });
  }

  routeToSignUp() {
    this.router.navigateByUrl("/signup");
  }

}
