import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaPage } from './categoria.page';

describe('CategoriaPage', () => {
  let component: CategoriaPage;
  let fixture: ComponentFixture<CategoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
