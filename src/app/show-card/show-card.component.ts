import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-card',
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css'],
})
export class ShowCardComponent implements OnInit {
  @Input() cardData: any;
  @Input() city: string = '';
  @Output() clickOnCard = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onCard(item: any): void {
    this.clickOnCard.emit(item);
  }
}
