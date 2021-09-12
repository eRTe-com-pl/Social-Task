import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import  firebase from 'firebase/app';
import 'firebase/auth';
import { Observable,of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
// import 'rxjs/add/operator/switchMap';

import 'rxjs/add/operator/switchMap';
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private ofAuth: AngularFireAuth,
    private router: Router
  ) { }

  login(email: string, password: string){
    this.ofAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      this.router.navigateByUrl('/profile');
    })
    .catch(err => {
      console.log("Something went wrong", err.message);
    });
  }

  emailSignup(email:string,password: string){
    this.ofAuth.createUserWithEmailAndPassword(email,password)
    .then(value=> {
      console.log('Succes', value);
      this.router.navigateByUrl('/profile');
    })
    .catch(error => {
      console.log('Something wrong', error)
    });
  }

  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
    .then(value => {
      console.log("Succes", value),
      this.router.navigateByUrl('/home');
    })
  }

  logout(){
    this.ofAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider){
    return this.ofAuth.signInWithPopup(provider);
  }
}
