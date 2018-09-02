import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    currentUser: any;
    constructor(private http: HttpClient) { }


    getAll() {
        let data = {};
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.currentUser.user['token']);
        return this.http.post<any>('http://127.0.0.1:3001/api/getAlluser', data, { 'headers': headers })
            .map(user => {
                return user;
            });
    }


    create(userdata) {
        let data = { 'user': userdata };
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post<any>('http://127.0.0.1:3001/api/user/save', data, { 'headers': headers })
            .map(user => {
                return user;
        });
    }


    delete(id: number) {
        let loggedinUser = JSON.parse(localStorage.getItem('currentUser'));
        let body = loggedinUser.user;
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.currentUser.user['token']);
        return this.http.post<any>('http://127.0.0.1:3001/api/user/' + id, body, { 'headers': headers })
            .map(user => {
                return user;
            });
    }

    update(data) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.currentUser.user['token']);
        return this.http.put<any>('http://127.0.0.1:3001/api/user/update', data, { 'headers': headers })
            .map(user => {
                return user;
            });
    }

    balanced(data) {
        let body = data;
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.currentUser.user['token']);
        return this.http.post<any>('http://127.0.0.1:3001/api/balanced/validate', body, { 'headers': headers })
            .map(user => {
                return user;
            });
    }

    attempts(data) {
        let body = data;
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.currentUser.user['token']);
        return this.http.post<any>('http://127.0.0.1:3001/api/balanced/attempts', body, { 'headers': headers })
            .map(user => {
                return user;
            });
    }
}
