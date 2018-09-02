import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    roles: any;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
            this.roles = [
                { label: 'Select Role', value: null },
                { label: 'Admin', value: 1 },
                { label: 'User', value: 2 },
                { label: 'Guest', value: 3 }
            ];
         }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['login']);
                },
                error => {
                   let err = JSON.stringify(error.error.errors);
                   let res = err.replace(/['"\{\}\\\/]/gi, '');
                    this.alertService.error(res);
                    this.loading = false;
                });
    }
}
