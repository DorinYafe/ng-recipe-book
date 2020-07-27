import { Component, OnInit, Input } from '@angular/core';
import { Recipie } from 'src/app/recipies/recipie.model';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css']
})
export class RecipieItemComponent implements OnInit {
  @Input() recipie: Recipie;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
