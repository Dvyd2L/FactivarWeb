import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { ICustomer, IInvoice } from '@/app/models/interfaces/api';
import { JsonPipe, AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-detail',
    standalone: true,
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss',
    providers: [ApiService],
    imports: [RouterLink, JsonPipe, AsyncPipe, LoaderComponent, DatePipe, ReactiveFormsModule]
})
export class DetailComponent implements OnInit {
  private api = inject(ApiService);
  public response$!: Observable<ICustomer>;
  @Input({ alias: 'id' }) public dataId!: string;
  public facturasProv: IInvoice[] | undefined = [];
  public facturasCli: IInvoice[] | undefined = [];
  public facturasProv2: IInvoice[] | undefined = [];
  public facturasCli2: IInvoice[] | undefined = [];
  public numeroFactuP = new FormControl({value:0,disabled:false});
  public numeroFactuC = new FormControl({value:0,disabled:false});

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.CLIENTES);
    this.response$ = this.api.read<string, ICustomer>(this.dataId);
  }

    //magia = (ev:Event) => (ev.target as HTMLInputElement).value;
    public buscarFacturaProv(ev:Event){
      console.log(this.numeroFactuP);
      console.log(ev);
      const magia = String(ev);
      this.facturasProv2 = this.facturasProv?.filter(f => f.numeroFactura.toString().includes(magia));
      //this.facturasProv = this.fact;
    }
  
    public buscarFacturaCli(ev:Event){
      const magia = String(ev);
      this.facturasCli2 = this.facturasCli?.filter(f => f.numeroFactura.toString().includes(magia));
      //this.facturasProv = this.fact;
    }
}
