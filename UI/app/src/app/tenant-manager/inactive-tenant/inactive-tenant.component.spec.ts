import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveTenantComponent } from './inactive-tenant.component';

describe('InactiveTenantComponent', () => {
  let component: InactiveTenantComponent;
  let fixture: ComponentFixture<InactiveTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveTenantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
