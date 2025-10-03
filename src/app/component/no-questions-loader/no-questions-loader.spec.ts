import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoQuestionsLoader } from './no-questions-loader';

describe('NoQuestionsLoader', () => {
  let component: NoQuestionsLoader;
  let fixture: ComponentFixture<NoQuestionsLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoQuestionsLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoQuestionsLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
