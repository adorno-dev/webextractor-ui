import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteExpressionsComponent } from './site-expressions.component';

describe('SiteExpressionsComponent', () => {
  let component: SiteExpressionsComponent;
  let fixture: ComponentFixture<SiteExpressionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteExpressionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteExpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
