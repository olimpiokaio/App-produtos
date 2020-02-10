import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProdutoPage } from './editar-produto.page';

describe('EditarProdutoPage', () => {
  let component: EditarProdutoPage;
  let fixture: ComponentFixture<EditarProdutoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProdutoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
