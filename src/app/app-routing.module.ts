import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings';
import { UsersComponent } from './components/users/users.component';
import {EmployeesComponent} from '@app/components/employees/employees.component';
import {ChatComponent} from '@app/components/chat/chat.component';
import {MetricsComponent} from '@app/components/metrics/metrics.component';
import {ProductsComponent} from '@app/components/products/products.component';
import {ServicesComponent} from '@app/components/services/services.component';
import {PushComponent} from '@app/components/push/push.component';
import {EmployeeDetailComponent} from "@app/components/employees/employee-detail/employee-detail.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'customers',
    component: UsersComponent,
    data: {
      title: 'Clientes'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    data: {
      title: 'Administradores'
    }
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailComponent,
    data: {
      title: 'Editar Administrador'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {
      title: 'Chat'
    }
  },
  {
    path: 'metrics',
    component: MetricsComponent,
    data: {
      title: 'Métricas'
    }
  },
  {
    path: 'products',
    component: ProductsComponent,
    data: {
      title: 'Productos'
    }
  },
  {
    path: 'push',
    component: PushComponent,
    data: {
      title: 'Notificaciones Push'
    }
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
