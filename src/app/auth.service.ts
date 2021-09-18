import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'rxjs/add/operator/switchMap';
import { switchMap } from "rxjs/operators";
import { first } from 'rxjs-compat/operator/first';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private ofAuth: AngularFireAuth,
    private router: Router
  ) { }

  emailLogin(email: string, password: string) {
    this.ofAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        // this.isLoggedIn_ = true;
        this.router.navigateByUrl('/profile');
      })
      .catch(err => {
        console.log("Something went wrong", err.message);
      });
  }

  emailSignup(email: string, password: string) {
    this.ofAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        // this.isLoggedIn_ = true;
        this.router.navigateByUrl('/profile');
      })
      .catch(error => {
        console.log('Something wrong', error)
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
        this.router.navigateByUrl('/login');
      })
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.ofAuth.signInWithPopup(provider);
  }

  logout() {
    this.ofAuth.signOut().then(() => {
      console.log('Logout..');
      console.log(this.isLoggedIn);
      this.router.navigate(['/login']);
    });
  }


  isLoggedIn() {
    // return this.ofAuth.onAuthStateChanged
    // var user = firebase.auth().currentUser;
    // return this.isLoggedIn_;
    // if (user) {
    //User is signed in.
    // } else {
    //No user is signed in.
    // }
  }
}
