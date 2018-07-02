import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UserTableComponent } from './components/users/user-table/user-table.component';
import { UserSubscriptionsComponent } from './components/users/user-subscriptions/user-subscriptions.component';
import { UserTableSortingComponent } from './components/users/user-table-sorting/user-table-sorting.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { PushComponent } from './components/push/push.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { ProductsComponent } from './components/products/products.component';
import { ServicesComponent } from './components/services/services.component';
import { ChatComponent } from './components/chat/chat.component';

import {httpInterceptorProviders} from './http-interceptors/index';

import {MatTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { AppadminComponent } from './components/appadmin/appadmin.component';



@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,

    // app
    AppRoutingModule,

    MatTableModule,
    CdkTableModule

  ],
  declarations: [AppComponent, UsersComponent, UserTableComponent,
    UserSubscriptionsComponent, UserTableSortingComponent, EmployeesComponent,
    PushComponent, MetricsComponent, ProductsComponent, ServicesComponent, ChatComponent, AppadminComponent
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
