import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserScreen } from './new-user-screen';

describe('NewUserScreen', () => {
  let component: NewUserScreen;
  let fixture: ComponentFixture<NewUserScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
