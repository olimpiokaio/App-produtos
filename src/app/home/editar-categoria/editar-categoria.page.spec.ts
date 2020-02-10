import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaPage } from './editar-categoria.page';

describe('EditarCategoriaPage', () => {
  let component: EditarCategoriaPage;
  let fixture: ComponentFixture<EditarCategoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCategoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
