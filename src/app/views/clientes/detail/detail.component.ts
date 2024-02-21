import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { ICustomer, IInvoice } from '@/app/models/interfaces/api';
import { JsonPipe, AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [ApiService],
  imports: [
    RouterLink,
    JsonPipe,
    AsyncPipe,
    LoaderComponent,
    DatePipe,
    ReactiveFormsModule,
  ],
})
export class DetailComponent implements OnInit {
  private api = inject(ApiService);
  @Input({ alias: 'id' }) public dataId!: string;
  public response$!: Observable<ICustomer>;
  public facturasProv: IInvoice[] = [];
  public facturasCli: IInvoice[] = [];
  public facturasProv2: IInvoice[] = [];
  public facturasCli2: IInvoice[] = [];
  public numeroFactuP = new FormControl({ value: 0, disabled: false });
  public numeroFactuC = new FormControl({ value: 0, disabled: false });

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.CLIENTES);
    this.response$ = this.api.read<string, ICustomer>(this.dataId);
  }

  public buscarFacturaProv(ev: Event) {
    this.facturasProv2 = this.facturasProv?.filter((f) =>
      f.numeroFactura.toString().includes(String(ev))
    );
  }

  public buscarFacturaCli(ev: Event) {
    this.facturasCli2 = this.facturasCli?.filter((f) =>
      f.numeroFactura.toString().includes(String(ev))
    );
  }
}
