import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectImageComponent } from './dialog-select-image.component';

describe('DialogSelectImageComponent', () => {
  let component: DialogSelectImageComponent;
  let fixture: ComponentFixture<DialogSelectImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSelectImageComponent]
    });
    fixture = TestBed.createComponent(DialogSelectImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
