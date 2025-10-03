import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptScreen } from './attempt-screen';

describe('AttemptScreen', () => {
  let component: AttemptScreen;
  let fixture: ComponentFixture<AttemptScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttemptScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttemptScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
