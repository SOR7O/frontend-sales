import { TestBed } from '@angular/core/testing';

import { ShopcarService } from './shopcar.service';

describe('ShopcarService', () => {
  let service: ShopcarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopcarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
