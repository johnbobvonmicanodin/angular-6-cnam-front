import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { NgModel } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Login } from '../models/login';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider, AuthService } from 'angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    login = new Login();
    failLog = false;
    errorField = false;


    email = '';
    password = '';

    constructor(
        private translate: TranslateService,
        public router: Router,
        public userService: UserService,
        private authService: AuthService
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
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


    ngOnInit() {    }

    onLoggedin() {

        this.login.mail = this.email;
        this.login.password = this.password;

        this.userService.login(this.login).subscribe(data => {

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
                console.log('bad log');
            }
        });
    }
}
