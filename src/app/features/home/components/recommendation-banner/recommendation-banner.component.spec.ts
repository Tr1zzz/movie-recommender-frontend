import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationBannerComponent } from './recommendation-banner.component';

describe('RecommendationBannerComponent', () => {
  let component: RecommendationBannerComponent;
  let fixture: ComponentFixture<RecommendationBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendationBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
