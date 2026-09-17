import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Api } from './services/api';
import { FormsModule } from '@angular/forms';
import { ItemsList } from './items-list/items-list';

@Component({
  imports: [RouterOutlet, FormsModule, ItemsList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  standalone: true
})
export class App implements OnInit {
  private api = inject(Api);
  protected readonly title = signal('frontend');

  ngOnInit() {
    this.api.getHello().subscribe(data => console.log(data));
  }
}
