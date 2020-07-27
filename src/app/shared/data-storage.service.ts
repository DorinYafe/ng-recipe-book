import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipieService } from '../recipies/recipie.service';
import { AuthService } from '../auth/auth.service';
import { Recipie } from '../recipies/recipie.model';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, private recipieService: RecipieService, private authService: AuthService) { }

    storeRecipie() {
        const recipies = this.recipieService.getRecipies();
        this.http.put('https://my-first-app-9c4b6.firebaseio.com/recipies.json', recipies)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipies() {
        return this.http
            .get<Recipie[]>(
                'https://my-first-app-9c4b6.firebaseio.com/recipies.json'
            )
            .pipe(
                map(recipies => { // This map are the oparetor we imported from 'rxjs/oparetors'
                    return recipies.map(recipie => { // This map is the java script method
                        return {
                            ...recipie,
                            ingredients: recipie.ingredients ? recipie.ingredients : []
                        };
                    });
                }), tap(recipies => {
                    this.recipieService.setRecipies(recipies);
                })
            )
    }
}