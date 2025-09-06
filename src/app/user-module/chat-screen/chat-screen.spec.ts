import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatScreenComponent } from './chat-screen';

describe('ChatScreen', () => {
  let component: ChatScreenComponent;
  let fixture: ComponentFixture<ChatScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
