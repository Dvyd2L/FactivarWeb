import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { ICustomer } from '@/app/models/interfaces/api';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, JsonPipe, AsyncPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [ApiService],
})
export class DetailComponent implements OnInit {
  private api = inject(ApiService);
  public response$!: Observable<ICustomer>;
  @Input({ alias: 'id' }) public dataId!: string;

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.CLIENTES);
    this.response$ = this.api.read<string, ICustomer>(this.dataId);
  }
}
