import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { NgModel } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Login } from '../models/login';

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
        public userService: UserService
        ) {
            this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
            this.translate.setDefaultLang('en');
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }




    ngOnInit() {    }

    onLoggedin() {

        const current = this;

        if (this.email !== '' && this.password !== '') {

        this.login.mail = this.email;
        this.login.password = this.password;

        this.userService.login(this.login).subscribe(data => {

            if (data != null) {
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
                current.failLog = true;
                setTimeout(() => current.failLog = false, 2000);
            }
        });

        } else {
            current.errorField = true;
            setTimeout(() => current.errorField = false, 2000);
        }
    }
}
