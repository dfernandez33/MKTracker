import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-grand-prix-submission',
  templateUrl: './grand-prix-submission.component.html',
  styleUrls: ['./grand-prix-submission.component.sass']
})
export class GrandPrixSubmissionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(param: string) {
    debugger;
    this.router.navigate(["result-submission", param]);
  }

}
