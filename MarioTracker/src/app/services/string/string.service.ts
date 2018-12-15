import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }
  
  
  public intToOrdinalNumberString(num: number): string {
    num = Math.round(num);
    let numString = num.toString();
  
    // If the ten's place is 1, the suffix is always "th"
    // (10th, 11th, 12th, 13th, 14th, 111th, 112th, etc.)
    if (Math.floor(num / 10) % 10 === 1) {
      return numString + "th";
    }
  
    // Otherwise, the suffix depends on the one's place as follows
    // (1st, 2nd, 3rd, 4th, 21st, 22nd, etc.)
    switch (num % 10) {
      case 1: return numString + "st";
      case 2: return numString + "nd";
      case 3: return numString + "rd";
      default: return numString + "th";
    }
  }
}
