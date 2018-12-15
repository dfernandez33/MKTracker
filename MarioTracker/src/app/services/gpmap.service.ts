import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GPMapService {

  private GPMap: Map<string, string[]> = new Map([
    ["mushroom",["Mario Kart Stadium", "Water Park", "Sweet Sweet Canyon", "Thwomp Ruins"]],
    ["flower", ["Mario Circuit", "Toad Harbor", "Twisted Mansion", "Shy Guy Falls"]],
    ["star", ["Sunshine Airport", "Dolphin Shoals", "Electrodome", "Mount Wario"]],
    ["special", ["Cloudtop Cruise", "Bone-Dry Dunes", "Bowser's Castle", "Rainbow Road"]],
    ["shell", ["Moo Moo Meadows", "Mario Circuit", "Cheep Cheep Beach", "Toad's Turnpike"]],
    ["banana", ["Dry Dry Desert", "Donut Plains 3", "Royal Raceway", "DK Jungle"]],
    ["leaf", ["Wario Stadium", "Sherbert Land", "Music Park", "Yoshi Valley"]],
    ["lightning", ["Tick-Tock Clock", "Piranha Plant Slide", "Grumble Volcano", "Rainbow Road (N64)"]],
    ["egg", ["Yoshi Circuit", "Excitebike Arena", "Dragon Driftway", "Mute City"]],
    ["triforce", ["Wario's Gold Mine", "Rainbow Road (SNES)", "Ice Ice Outpost", "Hyrule Circuit"]],
    ["bell", ["Neo Bowser City", "Ribbon Road", "Super Bell Subway", "Big Blue"]],
    ["crossing", ["Baby Park", "Cheese Land", "Wild Woods", "Animal Crossing"]]
  ]);

  constructor() { }

  getGPRaces(GP: string): string[] {
    return this.GPMap.get(GP);
  }
}
