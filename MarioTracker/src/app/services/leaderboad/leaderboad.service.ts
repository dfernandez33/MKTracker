import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '../../../../node_modules/@angular/fire/firestore';
import { User } from '../../interfaces/user';
import { Observable } from '../../../../node_modules/rxjs';
import { PlacementStats } from '../../interfaces/placement-stats';

@Injectable({
  providedIn: 'root'
})
export class LeaderboadService {

  constructor(private db: AngularFirestore) { }

  public getOverallScoreLeaderboard() {
    return this.db.collection("users").ref.orderBy("score", "desc").limit(10).get().then(query => {
      let scoreOrderedUsers = [];
      query.forEach(user => {
        scoreOrderedUsers.push(user.data());
      })
      return scoreOrderedUsers;
    });
  }

  // TODO: Make function return list of avg user scores
  public getAverageScoreLeaderboard() {
    return this.db.collection("users").ref.orderBy("pointRatio", "desc").limit(10).get().then(query => {
      let avgScoreOrderedUsers = [];
      query.forEach(user => {
        avgScoreOrderedUsers.push(user.data());
      })
      return avgScoreOrderedUsers;
    });
  }

  public getLeaderboardPosition(userName: string)  {
    return this.db.collection("users").ref.orderBy("pointRatio", "desc").get().then(query => {
      let counter = 1;
      let userFound = false;
      query.forEach(user => {
        if (user.data().userName === userName) {
          userFound = true;
        }
        if (!userFound) {
          counter++;
        }
      });
      return counter;
    })
  }

}
