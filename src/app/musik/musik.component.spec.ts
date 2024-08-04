import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusikComponent } from './musik.component';

describe('MusikComponent', () => {
  let component: MusikComponent;
  let fixture: ComponentFixture<MusikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusikComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
