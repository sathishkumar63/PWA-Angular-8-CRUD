import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserListComponent } from './new-user-list.component';

describe('NewUserListComponent', () => {
  let component: NewUserListComponent;
  let fixture: ComponentFixture<NewUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
