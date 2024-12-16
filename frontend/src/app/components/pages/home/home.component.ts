import { Component, inject } from '@angular/core';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/food';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    NotFoundComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  foodService = inject(FoodService);
  foods: Food[] = [];

  constructor() {
    let foodObservable: Observable<Food[]>;
    this.route.params.subscribe((params) => {
      if (params.searchTerm) {
        foodObservable = this.foodService.getAllFoodsBySearchTerm(
          params.searchTerm,
        );
      } else if (params.tag) {
        foodObservable = this.foodService.getAllFoodsByTag(params.tag);
      } else {
        foodObservable = this.foodService.getAll();
      }
      foodObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      });
    });
  }
}
