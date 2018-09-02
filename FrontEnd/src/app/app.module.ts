import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';

import {AlertComponent} from './_directives/index';
import {AuthGuard} from './_guards/index';
import {AlertService, AuthenticationService, UserService} from './_services/index';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        TableModule,
        DropdownModule,
        DialogModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MessagesModule,
        MessageModule,
        PanelModule

    ],
    declarations: [
        AppComponent, AlertComponent, HomeComponent, LoginComponent, RegisterComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        MessageService,
        UserService

    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
