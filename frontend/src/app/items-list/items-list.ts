// import { Component } from '@angular/core';

// @Component({
//   imports: [],
//   selector: 'app-items-list',
//   styleUrl: './items-list.css',
//   templateUrl: './items-list.html',
// })
// export class ItemsList {}
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, Item } from '../services/api';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './items-list.html',
  styleUrl: './items-list.css'
})
export class ItemsList implements OnInit {
  private api = inject(Api);

  items: Item[] = [];
  newItemName = '';
  errorMessage = '';

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.api.getItems().subscribe({
      next: (data) => (this.items = data),
      error: (err) => (this.errorMessage = 'Failed to load items')
    });
  }

  addItem() {
    if (!this.newItemName.trim()) return;
    this.api.createItem(this.newItemName).subscribe({
      next: (item) => {
        this.items.push(item);
        this.newItemName = '';
      },
      error: (err) => (this.errorMessage = 'Failed to add item')
    });
  }

  removeItem(id: number) {
    this.api.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter((i) => i.id !== id);
      },
      error: (err) => (this.errorMessage = 'Failed to delete item')
    });
  }
}