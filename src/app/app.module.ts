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
import { EmployeesComponent } from './components/employees/employees.component';
import { PushComponent } from './components/push/push.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { ProductsComponent } from './components/products/products.component';
import { ServicesComponent } from './components/services/services.component';
import { ChatComponent } from './components/chat/chat.component';
import { EmployeesTableComponent } from './components/employees/employees-table/employees-table.component';
import { EmployeesTablePaginatedComponent } from './components/employees/employees-table-paginated/employees-table-paginated.component';
import { EmployeeDetailComponent } from './components/employees/employee-detail/employee-detail.component';
import { EmployeeConfirmDialogComponent } from './components/employees/employee-confirm-dialog/employee-confirm-dialog.component';
import { EmployeeAddComponent } from './components/employees/employee-add/employee-add.component';
import { UserAddComponent } from './components/users/user-add/user-add.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { ProductAddComponent } from './components/products/product-add/product-add.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ServiceDetailComponent } from './components/services/service-detail/service-detail.component';
import { ServiceAddComponent } from './components/services/service-add/service-add.component';
import { ServiceTableComponent } from './components/services/service-table/service-table.component';
import { SimpleComponent } from './components/push/simple/simple.component';
import { SegmentComponent } from './components/push/segment/segment.component';

import {httpInterceptorProviders} from './http-interceptors/index';

import {MatTableModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { AppadminComponent } from './components/appadmin/appadmin.component';
import { ConversationComponent } from './components/chat/conversation/conversation.component';
import { KeysPipe } from './components/chat/pipes/keys.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { FaqsComponent } from './components/faqs/faqs.component';
import { FaqsTableComponent } from './components/faqs/faqs-table/faqs-table.component';
import { FaqsDetailComponent } from './components/faqs/faqs-detail/faqs-detail.component';
import { FaqsAddComponent } from './components/faqs/faqs-add/faqs-add.component';
import { AdvicesComponent } from './components/advices/advices.component';
import { AdviceEditComponent } from './components/advices/advice-edit/advice-edit.component';
import { AdviceDetailComponent } from './components/advices/advice-detail/advice-detail.component';
import { AdviceTableComponent } from './components/advices/advice-table/advice-table.component';
import { AdviceAddComponent } from './components/advices/advice-add/advice-add.component';
import { BannedwordsComponent } from './components/bannedwords/bannedwords.component';
import { BannedTableComponent } from './components/bannedwords/banned-table/banned-table.component';
import { BannedEditComponent } from './components/bannedwords/banned-edit/banned-edit.component';
import { BannedAddComponent } from './components/bannedwords/banned-add/banned-add.component';
import { HappystoriesComponent } from './components/happystories/happystories.component';
import { HappyAddComponent } from './components/happystories/happy-add/happy-add.component';
import { HappyTableComponent } from './components/happystories/happy-table/happy-table.component';
import { HappyDetailComponent } from './components/happystories/happy-detail/happy-detail.component';






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

    // Material
    MatTableModule,
    CdkTableModule,

    // Reactive forms
    ReactiveFormsModule

  ],
  declarations: [AppComponent, UsersComponent, UserTableComponent,
    UserSubscriptionsComponent, EmployeesComponent,
    PushComponent, MetricsComponent, ProductsComponent, ServicesComponent, ChatComponent,
    AppadminComponent, ConversationComponent, KeysPipe, EmployeesTableComponent,
    EmployeesTablePaginatedComponent, EmployeeDetailComponent, EmployeeConfirmDialogComponent,
    EmployeeAddComponent, UserAddComponent, UserDetailComponent, ProductAddComponent,
    ProductDetailComponent, ServiceDetailComponent, ServiceAddComponent, ServiceTableComponent,
    SimpleComponent, SegmentComponent, FaqsComponent, FaqsTableComponent, FaqsDetailComponent, FaqsAddComponent, AdvicesComponent, AdviceEditComponent, AdviceDetailComponent, AdviceTableComponent, AdviceAddComponent, BannedwordsComponent, BannedTableComponent, BannedEditComponent, BannedAddComponent, HappystoriesComponent, HappyAddComponent, HappyTableComponent, HappyDetailComponent
  ],
  entryComponents: [EmployeeConfirmDialogComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
