import { TestBed } from '@angular/core/testing';

import { ContactAccessService } from './contact-access.service';

describe('ContactAccessService', () => {
  let service: ContactAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
