import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { ICustomer } from '@/app/models/interfaces/api';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, JsonPipe, AsyncPipe],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  providers: [ApiService],
})
export class ClientesComponent implements OnInit {
  private api = inject(ApiService);
  public response$!: Observable<ICustomer[]>;

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.CLIENTES);
    this.response$ = this.api.read<unknown, ICustomer[]>();
  }
}
