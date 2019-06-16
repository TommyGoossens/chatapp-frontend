import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChatInformationComponent } from './dialog-chat-information.component';

describe('DialogChatInformationComponent', () => {
  let component: DialogChatInformationComponent;
  let fixture: ComponentFixture<DialogChatInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChatInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChatInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
