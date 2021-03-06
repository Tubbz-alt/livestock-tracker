import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTypeDetailComponent } from './feed-type-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FeedTypeService, MockFeedTypeService } from '../feed-type.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FeedTypeDetailComponent', () => {
  let component: FeedTypeDetailComponent;
  let fixture: ComponentFixture<FeedTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedTypeDetailComponent],
      providers: [{ provide: FeedTypeService, useClass: MockFeedTypeService }],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
