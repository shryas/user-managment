import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usermodel } from './user';
import { User } from '../_models/index';
import { UserService, AlertService } from '../_services/index';
import { ConditionalExpr } from '@angular/compiler';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    providers: [MessageService]
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    role: any;
    roles: any[];
    selectedRow: any;
    display: boolean;
    submitted: boolean;
    usermodel = {};
    displayadd: boolean;
    adduserusername: any;
    userName: any;
    adduseremail: any;
    adduserpassword: any;
    adduserdob: any;
    adduserrole: any;
    paranthesesinput: any;
    paranthesesState: any;
    userAttempts: any;

    constructor(private userService: UserService, private messageService: MessageService, private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.roles = [
            { label: 'Select Role', value: null },
            { label: 'Admin', value: 1 },
            { label: 'User', value: 2 },
            { label: 'Guest', value: 3 }
        ];
    }

    ngOnInit() {
        this.loadAllUsers();
        this.role = this.currentUser['user']['role'];
        this.userName = this.currentUser['user']['username'];
    }


    onRowSelect(data) {
        this.display = true;
        this.selectedRow = data;
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(
            data => {
                this.loadAllUsers();
                this.alertService.success(data['Status'], true);
            },
            error => {
                let err = JSON.stringify(error.error.errors);
                let res = err.replace(/['"\{\}\\\/]/gi, '');
                this.alertService.error(res);
            });
        this.display = false;
    }

    cancel() {
        this.display = false;
    }

    canceladd() {
        this.displayadd = false;
    }

    showDialogToAdd() {
        this.displayadd = true;
    }

    addUser() {
        let dataforadd = {
            'username': this.adduserusername,
            'email': this.adduseremail,
            'password': this.adduserpassword,
            'dob': this.adduserdob,
            'role': this.adduserrole
        }

        this.userService.create(dataforadd)
            .subscribe(
                data => {
                    this.displayadd = false;
                    this.loadAllUsers();
                    this.alertService.success('Added new user successfully', true);
                },
                error => {
                    let err = JSON.stringify(error.error.errors);
                    let res = err.replace(/['"\{\}\\\/]/gi, '');
                    this.alertService.error(res);
                });
    }

    update(data) {
        let seldata = {
            'payload': {
                'id': data._id
            },
            'user': {
                'username': data.username,
                'email': data.email,
                'role': data.role,
                'dob': data.dob
            }
        };
        this.userService.update(seldata)
            .subscribe(
                res => {
                    this.alertService.success('Saved successful', true);
                    this.cancel();
                    this.loadAllUsers();
                },
                error => {
                    let err = JSON.stringify(error.error.errors);
                    let res = err.replace(/['"\{\}\\\/]/gi, '');
                    this.alertService.error(res);
                });
    }

    checkvalidation(s) {
        let checkforattempts = {
            'balanced': { 'username': this.userName }
        }
        this.userService.attempts(checkforattempts).subscribe(
            data => {
                this.userAttempts = data['attempts'];
            },
            error => {
                // let err = JSON.stringify(error.error.errors);
                // let res = err.replace(/['"\{\}\\\/]/gi, '');
                //  this.alertService.error(res);
            });
console.log(this.userAttempts)
        let balanceddata = {
            'balanced': {
                'input': s,
                'username': this.userName,
                'attempts': this.userAttempts,
            },
        };
       
        this.userService.balanced(balanceddata).subscribe(
            data => {
                this.paranthesesState = data['Message'];
            },
            error => {
                let err = JSON.stringify(error.error.errors);
                let res = err.replace(/['"\{\}\\\/]/gi, '');
                this.alertService.error(res);
            });

    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => {
            this.users = users.AllUsers;
            this.users.forEach(el => {
                if (el.role === '1') {
                    el.role = 'admin';
                }
                if (el.role === '2') {
                    el.role = 'User';
                } else if (el.role === '3') {
                    el.role = 'Guest';
                }
            });
        });
    }
}
