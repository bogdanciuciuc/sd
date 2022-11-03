import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'clients',
    component: ClientListComponent
  },
  {
    path: 'clients/add',
    component: AddClientComponent
  },
  {
    path: 'clients/edit/:id',
    component: EditClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
