import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionChooserComponent } from './submission-chooser.component';

describe('SubmissionChooserComponent', () => {
  let component: SubmissionChooserComponent;
  let fixture: ComponentFixture<SubmissionChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
