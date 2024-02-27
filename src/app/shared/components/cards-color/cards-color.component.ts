import { IInvoice } from '@/app/models/interfaces/api';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards-color',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './cards-color.component.html',
  styleUrl: './cards-color.component.scss'
})
export class CardsColorComponent {
  @Input() factura!: IInvoice;
}
