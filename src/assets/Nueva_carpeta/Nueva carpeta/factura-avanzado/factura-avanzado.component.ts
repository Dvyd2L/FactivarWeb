/**
 * Componente para la página de factura avanzada.
 */
import { Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { ArticuloFacturaComponent } from '../../components/articulo-factura/articulo-factura.component';
import { calculateImportes } from '@app/helpers/facturas.helper';
import { IProduct } from '@app/interfaces/factivar';
import { IFacturaNueva, IFacturaResponse } from '@app/interfaces/factura.interface';
import { FormsModule } from '@angular/forms';
import { FacturasService } from '@app/services/facturas.service';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { addMessage } from '@app/helpers/message.helper';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-factura-avanzado',
  standalone: true,
  imports: [ArticuloFacturaComponent, FormsModule, ToastModule],
  templateUrl: './factura-avanzado.component.html',
  styleUrl: './factura-avanzado.component.css',
  providers: [MessageService, FacturasService],
})
export class FacturaAvanzadoComponent {
  nuevaFactu: IFacturaNueva = {
    numeroFactura: 0,
    pendientePago: false,
    descripcionOperacion: '',
    fechaExpedicion: '',
    fechaCobro: '',
    clienteId: '',
    proveedorId: '',
    articulos: [],
  };
  listaArticulos: IProduct[] = [];
  listaFacturas: IFacturaResponse[] = [];
  fecha = new Date().toISOString().split('T')[0];
  fechaCobro = new Date().toISOString().split('T')[0];
  fechaCorrecta = false; // false = pendiente de pago      true = no pendiente de pago
  max = -1;
  private errorMessage = addMessage;
  private facturasService = inject(FacturasService);
  private messageService = inject(MessageService);
  /**
   * Referencia al contenedor de vista del componente ArticuloFactura.
   */
  @ViewChild('articuloFactura', { read: ViewContainerRef })
  articuloFactura!: ViewContainerRef;

  ricias = {
    subTotal: 0,
    importeTotal: 0,
  };
  /**
   * Agrega un artículo al componente ArticuloFactura.
   */
  // addArticle() {
  //   this.articuloFactura.createComponent(ArticuloFacturaComponent);
  // }

  addArticulo(item: IProduct) {
    this.listaArticulos.push(item);
    this.ricias = calculateImportes(this.listaArticulos);
  }

  comprobarFecha() {
    this.fechaCorrecta = this.fechaCobro >= this.fecha;
  }

  comprobarNumeroFactura(){
    if(this.nuevaFactu.numeroFactura < this.max)
      return true;
    else{
      return false;
    }
  }

  getnumfactura(){
    if(this.nuevaFactu.proveedorId!=""){
      this.facturasService.getFacturasProv(this.nuevaFactu.proveedorId).
      subscribe({
        next: (facturas) => {
          this.listaFacturas = facturas;

          this.nuevaFactu.numeroFactura = this.listaFacturas.reduce((max,factura)=>{
            return factura.numeroFactura > max ? factura.numeroFactura : max;},
            this.listaFacturas[0].numeroFactura)+1;
          
          this.max = this.nuevaFactu.numeroFactura;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
  removeArticle(item: number) {
    this.listaArticulos.splice(item, 1);
    this.ricias = calculateImportes(this.listaArticulos);
  }

  crearFactura() {
    this.nuevaFactu.pendientePago = !this.fechaCorrecta;
    this.nuevaFactu.fechaExpedicion = this.fecha;
    this.nuevaFactu.fechaCobro = this.fechaCobro;
    this.nuevaFactu.articulos = this.listaArticulos;

    this.facturasService.addFactura(this.nuevaFactu).subscribe({
      next: (data) => {
        console.log({ data });
        this.messageService.add({
          severity: 'success',
          summary: 'Registro Creado',
          detail: 'Factura creada con éxito',
        });
      },
      error: (err) => {
        console.error({ err });
        if (err instanceof HttpErrorResponse) {
          this.errorMessage(err, this.messageService);
        }
      },
    });

    this.nuevaFactu = {
      numeroFactura: 0,
      pendientePago: false,
      descripcionOperacion: '',
      fechaExpedicion: '',
      fechaCobro: '',
      clienteId: '',
      proveedorId: '',
      articulos: [],
    };

    this.listaArticulos = [];
  }
}
