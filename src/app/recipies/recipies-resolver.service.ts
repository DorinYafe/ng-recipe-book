import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipie } from './recipie.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipieService } from './recipie.service';

@Injectable({ providedIn: 'root' })
export class RecipiesResolverService implements Resolve<Recipie[]> {

    constructor(private dataStorageService: DataStorageService, private recipiesService: RecipieService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipies = this.recipiesService.getRecipies();

        if (recipies.length === 0) {
            return this.dataStorageService.fetchRecipies();
        } else {
            return recipies;
        }
    }
}