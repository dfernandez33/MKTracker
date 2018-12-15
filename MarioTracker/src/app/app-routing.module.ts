import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResultSubmissionComponent } from './components/result-submission/result-submission.component';
import { SubmissionChooserComponent } from './components/submission-chooser/submission-chooser.component';
import { GrandPrixSubmissionComponent } from './components/grand-prix-submission/grand-prix-submission.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:UID', component: ProfileComponent },
  { path: 'result-submission/:GPID', component: ResultSubmissionComponent, runGuardsAndResolvers: 'always' },
  { path: 'submission-chooser', component: SubmissionChooserComponent },
  { path: 'grand-prix-submission', component: GrandPrixSubmissionComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
