import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBlogListComponent } from './users-blog-list.component';

describe('UsersBlogListComponent', () => {
  let component: UsersBlogListComponent;
  let fixture: ComponentFixture<UsersBlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
