import { IInvoice } from '@/app/models/interfaces/api';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-color',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './cards-color.component.html',
  styleUrl: './cards-color.component.scss'
})
export class CardsColorComponent {
  @Input() factura!: IInvoice;
}
