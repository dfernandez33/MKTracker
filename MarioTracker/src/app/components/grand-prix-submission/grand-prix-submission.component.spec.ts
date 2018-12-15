import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandPrixSubmissionComponent } from './grand-prix-submission.component';

describe('GrandPrixSubmissionComponent', () => {
  let component: GrandPrixSubmissionComponent;
  let fixture: ComponentFixture<GrandPrixSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandPrixSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandPrixSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
