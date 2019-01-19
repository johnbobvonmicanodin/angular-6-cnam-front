import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { NgModel } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../_services/user.service';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    user: SocialUser;
    private loggedIn: boolean;

    firstname = '';
    name = '';
    mail = '';
    password = '';
    confirmpassword = '';
    alreadyExist = false;
    errorField = false;

    userBase = new User();

    constructor(
        private translate: TranslateService,
        private authService: AuthService,
        private userService: UserService
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
             this.user = user;
        });
    }

    signIn() {

        if (this.mail !== '' && this.firstname !== '' && this.name !== '' ) {
        if (this.password === this.confirmpassword && this.password !== '') {
            this.userBase.Email = this.mail;
            this.userBase.FirstName = this.firstname;
            this.userBase.Name = this.name;
            this.userBase.Password = this.password;

            this.userService.addUser(this.userBase).subscribe(data => {
            if (data.firstName != null) {
                // console.log(data);
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('currentUser', data);
                localStorage.setItem('firstname', data.firstName);
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
                localStorage.setItem('isSeller', data.isSeller);
                localStorage.setItem('id', data.id);
                location.replace('/dashboard');
            } else {
                console.log('bad signin');
            }
            });
        } else {
            console.log('mdp');
        }
        } else {
            console.log('mailname');
        }
    }

    signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
