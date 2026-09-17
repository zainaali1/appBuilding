import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Item {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})

export class Api {
    constructor(private http: HttpClient) { }

    getHello() {
        return this.http.get('/api/hello');
    }
    getItems() {
        return this.http.get<Item[]>('/api/items');
    }
    getItem(id: number) {
        return this.http.get<Item>(`/api/items/${id}`);
    }
    createItem(name: string) {
        return this.http.post<Item>('/api/items', { name });
    }
    updateItem(id: number, name: string) {
        return this.http.put<Item>(`/api/items/${id}`, { name });
    }

    deleteItem(id: number) {
        return this.http.delete(`/api/items/${id}`);
    }
}