import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipieForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private recipieService: RecipieService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        // console.log(this.editMode);
      }
    );
  }

  onAddIngredient() {
    (<FormArray>this.recipieForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  onSubmit() {
    // console.log(this.recipieForm);
    // const newRecipie = new Recipie(
    //   this.recipieForm.value['name'],
    //   this.recipieForm.value['description'],
    //   this.recipieForm.value['imagePath'],
    //   this.recipieForm.value['ingredients']);
    if (this.editMode) {
      this.recipieService.updateRecipie(this.id, this.recipieForm.value);
    } else {
      this.recipieService.addRecipie(this.recipieForm.value);
    }
    this.onCancel();
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipieForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipieName = '';
    let recipieImagePath = '';
    let recipieDescription = '';
    let recipieIngredients = new FormArray([]);

    if (this.editMode) {
      const recipie = this.recipieService.getRecipie(this.id);
      recipieName = recipie.name;
      recipieImagePath = recipie.imagePath;
      recipieDescription = recipie.description;
      if (recipie['ingredients']) {
        for (let ingredient of recipie.ingredients) {
          recipieIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }
    this.recipieForm = new FormGroup({
      'name': new FormControl(recipieName, Validators.required),
      'imagePath': new FormControl(recipieImagePath, Validators.required),
      'description': new FormControl(recipieDescription, Validators.required),
      'ingredients': recipieIngredients,
    });
  }

  get controls() {
    return (<FormArray>this.recipieForm.get('ingredients')).controls;
  }


  // As of Angular 8+, there's a new way of clearing all items in a FormArray.

  // onDeleteFormArray() {
    // (<FormArray>this.recipieForm.get(('ingredients'))).clear();
  // }

  // The clear() method automatically loops through all registered FormControl(s) (or FormGroup(s)) in the
  // FormArray and removes them.
  // It's like manually creating a loop and calling removeAt() for every item.

}
