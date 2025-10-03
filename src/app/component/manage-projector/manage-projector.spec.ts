import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjector } from './manage-projector';

describe('ManageProjector', () => {
  let component: ManageProjector;
  let fixture: ComponentFixture<ManageProjector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProjector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProjector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
