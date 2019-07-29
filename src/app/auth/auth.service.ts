import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user = this.afAuth.authState.switchMap(user => {
      if(user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null)
      }
    })
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("You have successfully signed in"))
    .catch(error => alert(error.message))
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Welcome, your account has been created!"))
    .catch(error =>alert(error.message))
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email)
    .then(() => alert("We've sent you a password reset link"))
    .catch(error => alert(error.message))
  }

  signOut() {
    return this.afAuth.auth.signOut()
    .then(() => {
      this.router.navigate(['/'])
    })
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(Object.assign({}, data))
  }

}
