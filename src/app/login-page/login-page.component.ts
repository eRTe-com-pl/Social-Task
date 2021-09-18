import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService, public afAuth: AngularFireAuth) { }
  
  ngOnInit(): void {
  }
  
  loginGoogle(){
    this.authService.googleLogin();
  }
  
  signOut() {
    this.authService.logout();
  }
}
