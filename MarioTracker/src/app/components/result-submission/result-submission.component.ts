import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '../../../../node_modules/@angular/fire/auth';
import { AngularFirestore } from '../../../../node_modules/@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { formatDate } from '../../../../node_modules/@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { SwalPartialTargets, SwalComponent } from '@toverux/ngx-sweetalert2';
import { GPMapService } from '../../services/gpmap.service';

@Component({
  selector: 'app-result-submission',
  templateUrl: './result-submission.component.html',
  styleUrls: ['./result-submission.component.sass']
})
export class ResultSubmissionComponent implements OnInit, OnDestroy {

  @ViewChild('submission') private submissionSwal: SwalComponent;

  public maps: string[] = [
    undefined, "Mario Kart Stadium", "Water Park", "Sweet Sweet Canyon", "Thwomp Ruins",
    "Mario Circuit","Toad Harbor", "Twisted Mansion", "Shy Guy Falls",
    "Sunshine Airport","Dolphin Shoals", "Electrodome", "Mount Wario",
    "Cloudtop Cruise", "Bone-Dry Dunes", "Bowser's Castle", "Rainbow Road",
    "Yoshi Circuit", "Excitebike Arena", "Dragon Driftway", "Mute City",
    "Baby Park", "Cheese Land", "Wild Woods", "Animal Crossing",
    "Moo Moo Meadows", "Mario Circuit", "Cheep Cheep Beach", "Toad's Turnpike",
    "Dry Dry Desert", "Donut Plains 3", "Royal Raceway", "DK Jungle",
    "Wario Stadium", "Sherbert Land", "Music Park", "Yoshi Valley",
    "Tick-Tock Clock", "Piranha Plant Slide", "Grumble Volcano", "Rainbow Road (N64)",
    "Wario's Gold Mine", "Rainbow Road (SNES)","Ice Ice Outpost", "Hyrule Circuit",
    "Neo Bowser City", "Ribbon Road", "Super Bell Subway", "Big Blue"
  ];

  public positions: number[] = [
    undefined, 1,2,3,4,5,6,7,8,9,10,11,12
  ];

  public readonly scoring: Map<number, number> = new Map([[1, 12], [2, 11], [3, 10], [4,9], [5, 8], [6,7], [7,6],[8,5],[9,4],[10,3],[11,2],[12,1]]);

  public characters: string[] = [
    undefined, "Mario", "Luigi", "Peach", "Yoshi", "Bowser", "Donkey Kong", "Toad",
    "Koopa Troopa", "Daisy", "Shy Guy", "Wario", "Waluigi", "Baby Mario",
    "Baby Luigi", "Baby Peach", "Baby Daisy", "Rosalina", "Toadette", "Metal Mario",
    "Lakitu", "Larry", "Morton", "Wendy", "Iggy", "Roy", "Lemmy", "Ludwig",
    "Pink Goal Peach", "Baby Rosalina", "Tanooki Mario", "Cat Peach", "Link",
    "Villager", "Isabelle", "Dry Bowser", "King Boo"
  ];

  public character: string;
  public tracks: string[] = [];
  public results: string[] = [];

  private GPID: string;

  private navigationSubscription;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private userSvc: UserService, private router: Router,
              public readonly swalTargets: SwalPartialTargets, private activeRouter: ActivatedRoute, private GPService: GPMapService) {
    this.maps.sort();
    this.characters.sort();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.resetForm();
      }
    });
   }

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      this.GPID = params['GPID'];
      if (this.GPID !== "default") {
        this.tracks = this.GPService.getGPRaces(this.GPID);
      }
    })
  }

  submitForm() {
    if (this.userSvc.getCurrentUser().uid) {
      let numberWrites = 0;
      for (let i = 0; i < this.tracks.length; i++) {
        //read values from form
        let currentTrack = this.tracks[i];
        let currentResult = this.results[i];

        let userReference = this.db.collection("users").doc(this.userSvc.getCurrentUser().uid);
        //update user results with the new results
        userReference.collection("results").add({
          character: this.character,
          track: currentTrack,
          result: Number.parseInt(currentResult),
          date: formatDate(new Date(), 'yyyy/MM/dd', 'en')
        }).then(x => {
          numberWrites++;
          if (numberWrites == 4) {
              this.submissionSwal.show();
          }
        });

        //update user's stats
        userReference.get().subscribe(userData => {
            let newScore = userData.data().score + this.calculateScore();
            let newNumRaces = userData.data().numRaces + 1;
            let newPointRatio = Math.round((newScore / newNumRaces) * 100) / 100;
            userReference.set({ score: newScore, pointRatio: newPointRatio, numRaces: newNumRaces }, {merge: true});
        })
      }
    }
  }

  private calculateScore() {
    let totalScore = 0
    this.results.forEach(result => {
      totalScore += this.scoring.get(Number.parseInt(result));
    })
    return totalScore;
  }

  resetForm() {
    this.character = undefined;
    this.tracks = [];
    this.results = [];
  }

  routeResultForm() {
    this.router.navigateByUrl("submission-chooser");
  }

  routeHome() {
    this.router.navigateByUrl("home");
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
   }
  }

}

