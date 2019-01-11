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

        this.login.mail = this.email;
        this.login.password = this.password;

        this.userService.login(this.login).subscribe(data => {

            if (data.firstname != null) {
                console.log(data);
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('currentUser', data);
            } else {
                console.log('bad log');
            }
        });
    }
}
