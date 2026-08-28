import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRepeat } from './text-repeat';

describe('TextRepeat', () => {
  let component: TextRepeat;
  let fixture: ComponentFixture<TextRepeat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextRepeat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextRepeat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
