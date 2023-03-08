import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignglePostComponent } from './signgle-post.component';

describe('SignglePostComponent', () => {
  let component: SignglePostComponent;
  let fixture: ComponentFixture<SignglePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignglePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
