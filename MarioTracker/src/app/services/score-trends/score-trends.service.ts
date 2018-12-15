import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';
import { Chart } from 'chart.js';


@Injectable({
  providedIn: 'root'
})
export class ScoreTrendsService {

  constructor(private db: AngularFirestore) {}

  //TODO: Finish implementing the creation of score trend chart
  public getScoreChart(ctx: HTMLElement) {
    let today = new Date();
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return this.db.collection("score_trends").ref.where("timeStamp", ">=", weekAgo).where("timeStamp", "<=", today).orderBy("timeStamp").get().then(query => {
      let dates = [];
      let trends  = new Map<string, number[]>();
      query.forEach(entry => {
        let currentDate = entry.data().timeStamp.toDate()
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);        
        dates.push(currentDate);
        entry.data().score.forEach(user => {
          if (trends.has(user.user)) {
            let tempScores = trends.get(user.user);
            tempScores.push(user.score);
            trends.set(user.user, tempScores);
          } else {
            trends.set(user.user, [user.score]);
          }
        })
      })

      let datasets_array = [];
      let keyIterable = trends.keys()
      let currentKey = keyIterable.next();
      while (currentKey.value !== undefined) {
        let currentValue = trends.get(currentKey.value);
        datasets_array.push({
          label: currentKey.value,
          data: currentValue,
          backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
          fill: false
        });
        currentKey = keyIterable.next();
      }



      let data_object = {
        labels: dates,
        datasets: datasets_array
      };
      let options = {
        scales: {
          xAxes: [{
              type: 'time',
              time: {
                  unit: 'day',
              }
          }]
        }
      }
      // set chart object for render
      let chart = new Chart(ctx, {
        type: 'line',
        data: data_object,
        options: options
      });
      
      return chart;

    })
  }
}
