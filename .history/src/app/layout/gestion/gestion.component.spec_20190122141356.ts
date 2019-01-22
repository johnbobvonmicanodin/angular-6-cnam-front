import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GestionComponent } from './gestion.component';
import { GestionModule } from './gestion.module';

describe('GestionComponent', () => {
  let component: GestionComponent;
  let fixture: ComponentFixture<GestionComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          GestionModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
