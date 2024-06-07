import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSessioFraderaComponent } from './iniciar-sessio-fradera.component';

describe('IniciarSessioFraderaComponent', () => {
  let component: IniciarSessioFraderaComponent;
  let fixture: ComponentFixture<IniciarSessioFraderaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciarSessioFraderaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarSessioFraderaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
