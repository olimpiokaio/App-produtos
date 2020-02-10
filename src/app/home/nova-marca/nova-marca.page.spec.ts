import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaMarcaPage } from './nova-marca.page';

describe('NovaMarcaPage', () => {
  let component: NovaMarcaPage;
  let fixture: ComponentFixture<NovaMarcaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaMarcaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaMarcaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
