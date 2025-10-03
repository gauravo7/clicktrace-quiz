import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectorScreen } from './projector-screen';

describe('ProjectorScreen', () => {
  let component: ProjectorScreen;
  let fixture: ComponentFixture<ProjectorScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectorScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectorScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
