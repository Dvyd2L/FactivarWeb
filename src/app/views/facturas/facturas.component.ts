import { ApiService } from '@/app/core/api/api.service';
import { ICustomer, IInvoice, IProduct } from '@/app/models/interfaces/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { calculateImportes } from './helpers/facturas.helper';
import { ArticuloFacturaComponent } from './article/articulo-factura.component';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';

@Component({
  selector: 'app-facturas',
  standalone: true,
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss',
  providers: [ApiService],
  imports: [ReactiveFormsModule, ArticuloFacturaComponent],
})
export class FacturasComponent implements OnInit {
  ngOnInit(): void {
    this.magias();
  }
  private api = inject(ApiService);
  /**
   * Referencia al contenedor de vista del componente ArticuloFactura.
   */
  @ViewChild('articuloFactura', { read: ViewContainerRef })
  public articuloFactura!: ViewContainerRef;
  public facturaForm = new FormGroup({
    numeroFactura: new FormControl({ value: 0, disabled: false }, [
      Validators.required,
    ]),
    pendientePago: new FormControl({ value: false, disabled: false }, [
      Validators.required,
    ]),
    descripcionOperacion: new FormControl({ value: '', disabled: false }),
    fechaExpedicion: new FormControl(
      { value: new Date().toISOString().split('T')[0], disabled: true },
      [Validators.required]
    ),
    fechaCobro: new FormControl(
      { value: new Date().toISOString().split('T')[0], disabled: false },
      [Validators.required]
    ),
    clienteId: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    proveedorId: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
  });
  public listaFacturas: IInvoice[] = [];
  public listaArticulos: IProduct[] = [];
  public ricias = {
    subTotal: 0,
    importeTotal: 0,
  };
  public max = -1;

  public comprobarNumeroFactura() {
    return (
      this.facturaForm.value.numeroFactura &&
      this.facturaForm.value.numeroFactura < this.max
    );
  }

  // public comprobarFecha() {
  //   this.fechaCorrecta.setValue(this.fechaCobro >= this.fecha);
  // }

  public getNumerofactura() {
    if (this.facturaForm.value.proveedorId?.trim() != '') {
      this.api.setEndpoint(ApiEndpointEnum.CLIENTES);

      this.api
        .read<string, ICustomer>(this.facturaForm.value.proveedorId!)
        .subscribe({
          next: (res) => {
            this.listaFacturas = res.facturaProveedors!;

            this.facturaForm.value.numeroFactura =
              this.listaFacturas.reduce((max, factura) => {
                return factura.numeroFactura > max
                  ? factura.numeroFactura
                  : max;
              }, this.listaFacturas[0].numeroFactura) + 1;

            this.max = this.facturaForm.value.numeroFactura;
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  public addArticulo(item: IProduct) {
    this.listaArticulos.push(item);
    this.ricias = calculateImportes(this.listaArticulos);
  }

  public removeArticle(item: number) {
    this.listaArticulos.splice(item, 1);
    this.ricias = calculateImportes(this.listaArticulos);
  }

  public crearFactura() {
    if (this.facturaForm.valid) {
      this.api.setEndpoint(ApiEndpointEnum.FACTURAS);

      this.api
        .create({
          ...this.facturaForm.value,
          articulos: this.listaArticulos,
        })
        .subscribe({
          next: (data) => {
            console.log({ data });
            // this.messageService.add({
            //   severity: 'success',
            //   summary: 'Registro Creado',
            //   detail: 'Factura creada con éxito',
            // });
          },
          error: (err) => {
            console.error({ err });
            if (err instanceof HttpErrorResponse) {
              // this.errorMessage(err, this.messageService);
            }
          },
        });
      this.facturaForm.reset();
      this.listaArticulos = [];
    }
  }

  public magias() {
    const id = '55234902D';
    const mes = '02';
    const year = '2024';
    this.api.setEndpoint(ApiEndpointEnum.FACTURAS);
    this.api.read(`ivamensual/${id}/${mes}/${year}`).subscribe((res) => console.log(res));
  }
}
