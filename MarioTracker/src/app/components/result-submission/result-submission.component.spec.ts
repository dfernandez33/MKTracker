import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSubmissionComponent } from './result-submission.component';

describe('ResultSubmissionComponent', () => {
  let component: ResultSubmissionComponent;
  let fixture: ComponentFixture<ResultSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
