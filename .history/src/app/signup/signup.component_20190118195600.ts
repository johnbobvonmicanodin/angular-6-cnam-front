import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { NgModel } from '@angular/forms';
import { User } from '../models/user';

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

    userBase: User;

    constructor(
        private translate: TranslateService,
        private authService: AuthService
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

            console.log(this.userBase.Email + this.userBase.Name);
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
