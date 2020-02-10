import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaCategoriaPage } from './nova-categoria.page';

describe('NovaCategoriaPage', () => {
  let component: NovaCategoriaPage;
  let fixture: ComponentFixture<NovaCategoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaCategoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
