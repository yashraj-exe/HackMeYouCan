import { TestBed } from '@angular/core/testing';

import { AppAuthServiceService } from './app-auth-service.service';

describe('AppAuthServiceService', () => {
  let service: AppAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
