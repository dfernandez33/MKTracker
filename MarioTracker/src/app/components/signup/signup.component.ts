import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';
import { Router } from '../../../../node_modules/@angular/router';
import { AngularFireStorage } from '../../../../node_modules/@angular/fire/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public name: string;
  public userName: string;
  public email: string;
  public password: string;
  public verifiedPassword: string;
  public passwordError = false;
  public passwordErrorMessage: string;
  public emailError = false;
  public emailErrorMessage: string;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private storage: AngularFireStorage, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    if (this.password !== this.verifiedPassword) {
      this.resetForm();
      this.passwordError = true;
      this.passwordErrorMessage = "Please make sure that you passwords match!";
    } else {
      this.auth.auth.createUserWithEmailAndPassword(this.email, this.password).then(userInfo => {
        this.storage.storage.ref().child("profile_pics/generic-pp.png").getDownloadURL().then(link => {
          this.db.collection("users").doc(userInfo.user.uid).set({
            name: this.name,
            userName: this.userName,
            email: this.email,
            password: this.password,
            pictureLink: link,
            score: 0,
            pointRatio: 0,
            UID: userInfo.user.uid
          })
          .then(x => { this.router.navigateByUrl("/home")})
          .catch(error => alert("There was a problem saving the data. Please try again!"));
        })

      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          this.emailError = true;
          this.emailErrorMessage = "The email you have entered is already in use. Please try another email address!";
          this.email = undefined;
        } else if (errorCode === "auth/invalid-email") {
          this.emailError = true;
          this.emailErrorMessage = "The email you have entered is not valid. Please try another email address!";
          this.email = undefined;
        } else if (errorCode === "auth/weak-password") {
          this.passwordError = true;
          this.passwordErrorMessage = "Please enter a stronger password.";
          this.password = undefined;
          this.verifiedPassword = undefined;
        }
      });
    }
  }

  resetForm() {
    this.name = undefined;
    this.userName = undefined;
    this.email = undefined;
    this.password = undefined;
    this.verifiedPassword = undefined;
    this.passwordError = false;
    this.passwordErrorMessage = undefined;
    this.emailError = false;
    this.emailErrorMessage = undefined;
  }
}
