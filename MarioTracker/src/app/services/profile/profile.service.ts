import { Injectable } from '@angular/core';
import { AngularFirestoreDocument } from '../../../../node_modules/@angular/fire/firestore';
import { StringService } from '../string/string.service';
import { PlacementStats } from '../../interfaces/placement-stats';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly colorArray = ["#AA3C39", "#00864D", "#D8AD28", "#2A4900", "#230335","#EB1F3B",
                                  "#4FAE00","#FFFA44","#3D12AF", "#FF1A08","#003C04", "#FF7D65"]

  constructor(private stringSvc: StringService) { }

  public getPlacementStats(userRef: AngularFirestoreDocument) {
    let placementStats: PlacementStats = {
      victories: 0,
      top3: 0,
      top5: 0
    };
    let promiseArray = [];
    promiseArray.push(userRef.collection("results").ref.where("result", "==", 1).get().then(query => {
      placementStats.victories = query.size;
    }));
    promiseArray.push(userRef.collection("results").ref.where("result", "<=", 3).get().then(query => {
      placementStats.top3 = query.size;
    }));
    promiseArray.push(userRef.collection("results").ref.where("result", "<=", 5).get().then(query => {
      placementStats.top5 = query.size;
    }));

    return Promise.all(promiseArray).then(x => {return placementStats});
  }

  public makeResultsPieChart(userRef: AngularFirestoreDocument, ctx: HTMLElement) {
    let resultsMap: Map<number, number> = new Map();
    return userRef.collection("results").get().toPromise().then(snapshot => {
      //populate result map
      snapshot.forEach(result => {
        let data = result.data();
        let currentValue = resultsMap.get(data.result);
        if (currentValue === undefined) {
          resultsMap.set(data.result, 1);
        } else {
          resultsMap.set(data.result, ++currentValue);
        }
      });

      //set arrays for the data object
      let results = Array.from(resultsMap.values());
      let labels: any[] = Array.from(resultsMap.keys());
      let backgroundColors = [];
      for (let i = 0; i < results.length; i++) {
        backgroundColors.push(this.colorArray[labels[i]]);
        labels[i] = this.stringSvc.intToOrdinalNumberString(labels[i]);
      }

      let data = {
        datasets: [{
            data: results,
            backgroundColor: backgroundColors
        }],
    
        labels: labels
      };
      let options = {}
      // set chart object for render
      let chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
      });

      return {chart: chart, hasData: snapshot.size > 0};
    })
  }

}
