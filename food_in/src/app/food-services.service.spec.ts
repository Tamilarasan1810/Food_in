import { TestBed } from '@angular/core/testing';

import { FoodServicesService } from './food-services.service';

describe('FoodServicesService', () => {
  let service: FoodServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
