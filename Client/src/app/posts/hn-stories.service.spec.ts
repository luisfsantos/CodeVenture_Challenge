import { TestBed, inject } from '@angular/core/testing';

import { HnStoriesService } from './hn-stories.service';

describe('HnStoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HnStoriesService]
    });
  });

  it('should be created', inject([HnStoriesService], (service: HnStoriesService) => {
    expect(service).toBeTruthy();
  }));
});
