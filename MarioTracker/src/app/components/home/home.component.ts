import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';
import { User } from '../../interfaces/user';
import { LeaderboadService } from '../../services/leaderboad/leaderboad.service';
import { ScoreTrendsService } from '../../services/score-trends/score-trends.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public uid: string;
  public user;

  public overallScoreleaderboard;
  public ratioLeaderboard;
  public scoreTrendsChart;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private lbSvc: LeaderboadService, private trendsSvc: ScoreTrendsService) { }

  ngOnInit() {
    this.auth.auth.onAuthStateChanged(currentUser => {
      this.uid = currentUser.uid;
      this.db.collection("users").doc(this.uid).get().subscribe(
        document => {
          const userData = document.data();
          this.user = userData;
          this.lbSvc.getOverallScoreLeaderboard().then(leaderboard => {
            this.overallScoreleaderboard = leaderboard;
          });
          this.lbSvc.getAverageScoreLeaderboard().then(leaderboard => {
            this.ratioLeaderboard = leaderboard;
          })
        });
        let ctx = document.getElementById('scoreTrendsChart');
        this.trendsSvc.getScoreChart(ctx).then(response => {
          this.scoreTrendsChart = response;
        })
    });
  }
}
