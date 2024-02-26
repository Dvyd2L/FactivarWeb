import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { CalculosIva, ICustomer, IInvoice } from '@/app/models/interfaces/api';
import { JsonPipe, AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardsColorComponent } from "../../../shared/components/cards-color/cards-color.component";

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
        CardsColorComponent
    ]
})
export class DetailComponent implements OnInit {
  private api = inject(ApiService);
  @Input({ alias: 'id' }) public dataId!: string;
  public response$!: Observable<ICustomer>;
  public facturasProv?: IInvoice[] = [];
  public facturasCli?: IInvoice[] = [];
  public facturasProv2?: IInvoice[] = [];
  public facturasCli2?: IInvoice[] = [];
  public numeroFactuP = new FormControl({ value: 0, disabled: false });
  public numeroFactuC = new FormControl({ value: 0, disabled: false });
  //Para cálculos de IVA
  public mes = new FormControl({ value: 0, disabled: false });
  public trimestre = new FormControl({ value: 0, disabled: false });
  public year = new FormControl({ value: 0, disabled: false });
  public resp: Observable<CalculosIva>[] = [];


  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.CLIENTES);
    this.response$ = this.api.read<string, ICustomer>(this.dataId);

    this.response$.subscribe({
      next:(data) => {
        this.facturasProv = data.facturaProveedors;
        this.facturasProv2 = this.facturasProv;
        this.facturasCli = data.facturaClientes;
        this.facturasCli2 = this.facturasCli;
      },
      error:(error) => {console.error(error)},
    });
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

  public calculaIvaMensual(){
    this.api.setEndpoint(ApiEndpointEnum.FACTURAS);
    this.api.read(`ivamensual/${this.dataId}/${this.mes.value}/${this.year.value}`).subscribe((res) => console.log(res));
  }

  public calculaIvaTrimestral(){
    this.api.setEndpoint(ApiEndpointEnum.FACTURAS);
    this.api.read(`ivatrimestral/${this.dataId}/${this.trimestre.value}/${this.year.value}`).subscribe((res) => console.log(res));
  }

  public calculaIvaAnual(){
    this.api.setEndpoint(ApiEndpointEnum.FACTURAS);
    this.api.read(`ivaanual/${this.dataId}/${this.year.value}`).subscribe((res) => console.log(res));
  }
}
