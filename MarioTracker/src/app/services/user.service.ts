import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/@angular/fire/auth';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AngularFireAuth) { }

  public getCurrentUser() {
    return this.auth.auth.currentUser;
  }
}
