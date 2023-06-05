import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ticketService {
  rootUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  postCard(postCard: any) {
    return this.http.post(this.rootUrl + 'Tickets/', postCard);
  }

  getCards() {
    return this.http.get(this.rootUrl + 'Tickets/');
  }

  updateCard(postCard: any, id: string) {
    return this.http.put(this.rootUrl + 'Tickets/' + id, postCard);
  }
}
