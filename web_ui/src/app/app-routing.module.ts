import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ClientDevicesComponent } from './components/clients/client-devices/client-devices.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { LinkComponent } from './components/clients/link/link.component';
import { AddDeviceComponent } from './components/devices/add-device/add-device.component';
import { DeviceListComponent } from './components/devices/device-list/device-list.component';
import { EditDeviceComponent } from './components/devices/edit-device/edit-device.component';
import { EnergyComponent } from './components/energy/energy.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'authenticate',
    component: AuthenticateComponent
  },
  {
    path: 'clients',
    component: ClientListComponent
  },
  {
    path: 'devices',
    component: DeviceListComponent
  },
  {
    path: 'clients/add',
    component: AddClientComponent
  },
  {
    path: 'devices/add',
    component: AddDeviceComponent
  },
  {
    path: 'clients/edit/:id',
    component: EditClientComponent
  },
  {
    path: 'devices/edit/:id',
    component: EditDeviceComponent
  },
  {
    path: 'clients/devices/:id',
    component: ClientDevicesComponent
  },
  {
    path: 'clients/devices/link/:id',
    component: LinkComponent
  },
  {
    path: 'consume',
    component: EnergyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
