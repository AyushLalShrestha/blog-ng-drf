import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBlogComponent } from './usersblog.component';

describe('UsersBlogComponent', () => {
  let component: UsersBlogComponent;
  let fixture: ComponentFixture<UsersBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
