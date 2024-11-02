import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerBulkComponent } from './add-customer-bulk.component';

describe('AddCustomerBulkComponent', () => {
  let component: AddCustomerBulkComponent;
  let fixture: ComponentFixture<AddCustomerBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerBulkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
