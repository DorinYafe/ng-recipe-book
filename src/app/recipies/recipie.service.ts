import { Injectable } from '@angular/core';

import { Recipie } from '../recipies/recipie.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
// import { Subject } from 'rxjs/Subject';
import { Subject } from 'rxjs';

@Injectable()

export class RecipieService {

    recipiesChanged = new Subject<Recipie[]>();

    // private recipies: Recipie[] = [
    //     new Recipie('A Test Recipie',
    //         'This is simply a test',
    //         "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1472483520-springtacos-1572537127.jpg?crop=1.00xw:0.672xh;0,0.156xh&resize=640:*",
    //         [
    //             new Ingredient('Tortya', 1),
    //             new Ingredient('Humus', 20)
    //         ]),
    //     new Recipie('An other Test Recipie',
    //         'This is simply a test',
    //         "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/1472483520-springtacos-1572537127.jpg?crop=1.00xw:0.672xh;0,0.156xh&resize=640:*",
    //         [
    //             new Ingredient('Bun', 1),
    //             new Ingredient('Soya Burger', 1)
    //         ])
    // ];

    private recipies: Recipie[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipies(recipies: Recipie[]) {
        this.recipies = recipies;
        this.recipiesChanged.next(this.recipies.slice());
    }

    getRecipies() {
        return this.recipies.slice();
    }

    getRecipie(index: number) {
        // return this.recipies.slice()[index];
        return this.recipies[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipie(recipie: Recipie) {
        this.recipies.push(recipie);
        this.recipiesChanged.next(this.recipies.slice());
    }

    updateRecipie(index: number, newRecipie: Recipie) {
        this.recipies[index] = newRecipie;
        this.recipiesChanged.next(this.recipies.slice());
    }

    deleteRecipie(index: number) {
        this.recipies.splice(index, 1);
        this.recipiesChanged.next(this.recipies.slice());
    }
}