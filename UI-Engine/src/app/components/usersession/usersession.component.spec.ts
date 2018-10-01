import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersessionComponent } from './usersession.component';

describe('UsersessionComponent', () => {
  let component: UsersessionComponent;
  let fixture: ComponentFixture<UsersessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
