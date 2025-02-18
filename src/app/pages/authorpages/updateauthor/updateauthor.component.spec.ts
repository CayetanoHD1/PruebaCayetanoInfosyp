import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateauthorComponent } from './updateauthor.component';

describe('UpdateauthorComponent', () => {
  let component: UpdateauthorComponent;
  let fixture: ComponentFixture<UpdateauthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateauthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
