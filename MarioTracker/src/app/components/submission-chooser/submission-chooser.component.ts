import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-submission-chooser',
  templateUrl: './submission-chooser.component.html',
  styleUrls: ['./submission-chooser.component.sass']
})
export class SubmissionChooserComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
