import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { DeviceListComponent } from './components/devices/device-list/device-list.component';
import { AddDeviceComponent } from './components/devices/add-device/add-device.component';
import { EditDeviceComponent } from './components/devices/edit-device/edit-device.component';
import { ClientDevicesComponent } from './components/clients/client-devices/client-devices.component';
import { LinkComponent } from './components/clients/link/link.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    AddClientComponent,
    EditClientComponent,
    WelcomePageComponent,
    AuthenticateComponent,
    DeviceListComponent,
    AddDeviceComponent,
    EditDeviceComponent,
    ClientDevicesComponent,
    LinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
