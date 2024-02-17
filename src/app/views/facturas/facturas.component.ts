import { ApiService } from '@/app/core/api/api.service';
import { IProduct } from '@/app/models/interfaces/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { calculateImportes } from './helpers/facturas.helper';
import { ArticuloFacturaComponent } from './article/articulo-factura.component';

@Component({
  selector: 'app-facturas',
  standalone: true,
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss',
  providers: [ApiService],
  imports: [ReactiveFormsModule, ArticuloFacturaComponent],
})
export class FacturasComponent {
  private api = inject(ApiService);
  // private errorMessage = addMessage;
  // private messageService = inject(MessageService);
  /**
   * Referencia al contenedor de vista del componente ArticuloFactura.
   */
  @ViewChild('articuloFactura', { read: ViewContainerRef })
  public articuloFactura!: ViewContainerRef;
  public facturaForm /* : IFacturaNueva */ = new FormGroup({
    numeroFactura: new FormControl({ value: 0, disabled: false }),
    pendientePago: new FormControl({ value: false, disabled: false }),
    descripcionOperacion: new FormControl({ value: '', disabled: false }),
    fechaExpedicion: new FormControl({ value: '', disabled: false }),
    fechaCobro: new FormControl({ value: '', disabled: false }),
    clienteId: new FormControl({ value: '', disabled: false }),
    proveedorId: new FormControl({ value: '', disabled: false }),
  });
  public listaArticulos: IProduct[] = [];
  public fecha = new FormControl({
    value: new Date().toISOString().split('T')[0],
    disabled: true,
  });
  public fechaCobro = new FormControl({
    value: new Date().toISOString().split('T')[0],
    disabled: false,
  });
  public fechaCorrecta = new FormControl({ value: false, disabled: false }); // false = pendiente de pago      true = no pendiente de pago
  public ricias = {
    subTotal: 0,
    importeTotal: 0,
  };

  public addArticulo(item: IProduct) {
    this.listaArticulos.push(item);
    this.ricias = calculateImportes(this.listaArticulos);
  }

  public comprobarFecha() {
    this.fechaCorrecta.setValue(this.fechaCobro >= this.fecha);
  }

  public removeArticle(item: number) {
    this.listaArticulos.splice(item, 1);
    this.ricias = calculateImportes(this.listaArticulos);
  }

  public crearFactura() {
    if (this.facturaForm.valid) {
      this.api
        .create({
          ...this.facturaForm.value,
          fechaExpedicion: this.fecha,
          pendientePago: !this.fechaCorrecta,
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
}
