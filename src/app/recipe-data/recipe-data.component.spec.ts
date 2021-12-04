import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDataComponent } from './recipe-data.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('RecipeDataComponent', () => {
  let component: RecipeDataComponent;
  let fixture: ComponentFixture<RecipeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDataComponent],
      imports: [
        MatCardModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatButtonModule, NoopAnimationsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
