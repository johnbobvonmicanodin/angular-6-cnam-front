import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()

export class UserGuard {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let autorisation = false;
        if ( localStorage.getItem('login')) {
            autorisation = true;
        }

       if (!autorisation) {
            this.router.navigate(['/']);
        }

        return autorisation;
    }

}
