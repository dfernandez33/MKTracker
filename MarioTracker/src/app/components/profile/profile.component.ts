import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { StringService } from '../../services/string/string.service';
import { LeaderboadService } from '../../services/leaderboad/leaderboad.service';
import { PlacementStats } from '../../interfaces/placement-stats';
import { ProfileService } from '../../services/profile/profile.service';
import { element } from '../../../../node_modules/protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  public uid: string;
  public user;
  public paramUID: string;

  public ranking: number;
  public placementStats: PlacementStats;

  public pictureURLS = [];
  public showPictureDialog = false;
  public successfulPatch = false;

  public resultsPieChart;
  public hasData = false;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private stringSvc: StringService, 
              private lbSvc: LeaderboadService, private profileSvc: ProfileService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.auth.auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.uid = this.auth.auth.currentUser.uid;
      }
    });
    this.activeRoute.params.subscribe(params => {
      this.paramUID  = params["UID"];
      let userReference = this.db.collection("users").doc(this.paramUID);
      userReference.valueChanges().subscribe(document => {
        const userData = document;
        this.user = userData;
        this.lbSvc.getLeaderboardPosition(this.user.userName).then(ranking => {
          this.ranking = ranking;
        });
      });
      //get data for results pie chart
      let ctx = document.getElementById('resultsPieChart');
      this.profileSvc.makeResultsPieChart(userReference, ctx).then(response => {
        this.hasData = response.hasData;
        this.resultsPieChart = response.chart;
      })
  
      // populate top finishes statss
      this.profileSvc.getPlacementStats(userReference).then(stats => {
        this.placementStats = stats;
      })
    });
  }

  openPictureDialog() {
    if (this.pictureURLS.length > 0) {
      this.showPictureDialog = true;
    } else {
      this.db.collection("pictures").get().subscribe(list => {
        list.forEach(picture => {
          this.pictureURLS.push(picture.data().url);
        });
        this.showPictureDialog = true;
      });
    }
  }

  closePictureDialog() {
    this.showPictureDialog = false;
    this.successfulPatch = false;
  }

  updatePicture(link: string) {
    this.db.collection("users").doc(this.uid).set({
      pictureLink: link
    }, { merge: true }).then(x => this.successfulPatch = true);
  }
}
