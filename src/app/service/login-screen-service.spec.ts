import { TestBed } from '@angular/core/testing';

import { LoginScreenService } from './login-screen-service';

describe('LoginScreenService', () => {
  let service: LoginScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
