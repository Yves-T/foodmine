import { Component, inject } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { FoodService } from '../../../services/food.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags',
  imports: [RouterModule, CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  foodService = inject(FoodService);
  tags?: Tag[];

  constructor() {
    this.foodService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }
}
