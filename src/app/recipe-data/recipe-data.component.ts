import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { CookProfile } from '../CookProfile';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.css']
})
export class RecipeDataComponent implements OnInit {
  recipe: Recipe;
  showDiffs = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const startRecipe = '07af62081e081e001e00800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f75376e023510006900000000000000000099ee';
    this.recipe = {
      originalCookProfile: CookProfile.fromData(startRecipe),
      cookProfile: CookProfile.fromData(startRecipe)
    };
  }

  getOriginalRecipeAsBitArray() {
    const sb = new Array<Array<string>>();
    for (const byte of this.recipe.originalCookProfile.data) {
      sb.push([...byte.toString(2).padStart(8, '0')]);
    }
    return sb;
  }

  getRecipeAsBitArray() {
    const sb = new Array<Array<string>>();
    for (const byte of this.recipe.cookProfile.data) {
      sb.push([...(byte.toString(2)).padStart(8, '0')]);
    }
    // console.log(sb);
    return sb;
  }

  getClass(a, b) {
    return a === b ? 'same' : 'different';
  }


  calculate(newRecipe) {
    this.recipe.cookProfile.setDataFromHex(newRecipe);
  }

}

