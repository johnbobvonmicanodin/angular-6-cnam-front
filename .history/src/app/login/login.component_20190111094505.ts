import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { FormsModule } from '@angular/forms';
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

    ngOnInit() {
        this.login.mail = 'test@test.fr';
        this.login.password = '123456';

        this.userService.login(this.login).subscribe(data => {
            console.log(data);
        });
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');

        console.log(this.email);
        console.log(this.password);
    }
}
