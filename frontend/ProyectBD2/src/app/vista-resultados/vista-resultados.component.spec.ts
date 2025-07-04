import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaResultadosComponent } from './vista-resultados.component';

describe('VistaResultadosComponent', () => {
  let component: VistaResultadosComponent;
  let fixture: ComponentFixture<VistaResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
