import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDevicesComponent } from './client-devices.component';

describe('ClientDevicesComponent', () => {
  let component: ClientDevicesComponent;
  let fixture: ComponentFixture<ClientDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
