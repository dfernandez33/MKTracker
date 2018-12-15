import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public uid: string;
  public user;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
   }

  ngOnInit() { 
    this.auth.auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.uid = this.auth.auth.currentUser.uid;
        this.db.collection("users").doc(this.uid).valueChanges().subscribe(
          document => {
            this.user = document;
          }
        )
      } else {
        this.user = undefined;
      }
    });
  }

}
