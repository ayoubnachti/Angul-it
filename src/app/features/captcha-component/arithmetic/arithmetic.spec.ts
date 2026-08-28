import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Arithmetic } from './arithmetic';

describe('Arithmetic', () => {
  let component: Arithmetic;
  let fixture: ComponentFixture<Arithmetic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Arithmetic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Arithmetic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
