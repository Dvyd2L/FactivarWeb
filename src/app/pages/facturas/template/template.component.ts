import { ApiService } from '@/app/api/api.service';
import { ApiEndpointEnum } from '@/app/enums/api.enum';
import { IInvoice } from '@/app/interfaces/api';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit {
  private api = inject(ApiService);
  public response$!:Observable<IInvoice>;
  @Input({ alias: 'id' }) public dataId!: number;
  
  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.FACTURAS);
    this.response$ = this.api.read<number, IInvoice>(this.dataId);
  }
}
