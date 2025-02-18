import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateauthorComponent } from './createauthor.component';

describe('CreateauthorComponent', () => {
  let component: CreateauthorComponent;
  let fixture: ComponentFixture<CreateauthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateauthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
