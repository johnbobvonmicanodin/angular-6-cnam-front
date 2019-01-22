import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BasketComponent } from './basket.component';
import { BasketModule } from './basket.module';

describe('BasketComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BasketModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(BasketComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
