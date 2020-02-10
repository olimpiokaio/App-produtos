import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMarcaPage } from './editar-marca.page';

describe('EditarMarcaPage', () => {
  let component: EditarMarcaPage;
  let fixture: ComponentFixture<EditarMarcaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMarcaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMarcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
