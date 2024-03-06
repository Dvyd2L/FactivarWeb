import { ApiService } from '@/app/core/api/api.service';
import { ICustomer, IInvoice, IProduct } from '@/app/models/interfaces/api';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { calculateImportes } from './helpers/facturas.helper';
import { ArticuloFacturaComponent } from './article/articulo-factura.component';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { ToastService } from '@/app/core/services/toast.service';

@Component({
  selector: 'app-facturas',
  standalone: true,
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss',
  providers: [ApiService],
  imports: [ReactiveFormsModule, ArticuloFacturaComponent],
})
export class FacturasComponent implements OnInit {
  private toastSvc = inject(ToastService);
  private api = inject(ApiService);
  /**
   * Referencia al contenedor de vista del componente ArticuloFactura.
   */
  @ViewChild('articuloFactura', { read: ViewContainerRef })
  public articuloFactura!: ViewContainerRef;
  public facturaForm = new FormGroup({
    numeroFactura: new FormControl<number>({ value: 0, disabled: false }, [
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

  ngOnInit(): void {
    this.facturaForm
      .get('proveedorId')
      ?.valueChanges.subscribe((nuevoValor) => {
        this.getNumerofactura(nuevoValor ?? '');
      });

      this.facturaForm.get('fechaCobro')?.valueChanges.subscribe((nuevoValor) => {
        console.log(nuevoValor);
        if(nuevoValor! < new Date().toISOString().split('T')[0]){ 
          this.toastSvc.add({
            title: 'error',
            message: 'La fecha de cobre debe ser superior o igual a la fecha de expedición',
            type: 'error',
            life: 3000,
          });
        }
      })
  }

  public comprobarNumeroFactura() {
    if(this.facturaForm.value.numeroFactura! < this.max) {
      this.toastSvc.add({
        title: 'error',
        message: 'Número de factura debe ser superior al último usado',
        type: 'error',
        life: 3000,
      });
    }
  }

  // public comprobarFecha() {
  //   this.fechaCorrecta.setValue(this.fechaCobro >= this.fecha);
  // }

  public getNumerofactura(proveedorId: string) {
    if (proveedorId?.trim() != '') {
      this.api.setEndpoint(ApiEndpointEnum.CLIENTES);

      this.api.read<string, ICustomer>(proveedorId).subscribe({
        next: (res) => {
          this.listaFacturas = res.facturaProveedors!;

          if(this.listaFacturas.length == 0){
            this.max = 1;
          } else {
          this.facturaForm.value.numeroFactura =
            this.listaFacturas.reduce((max, factura) => {
              return factura.numeroFactura > max ? factura.numeroFactura : max;
            }, this.listaFacturas[0].numeroFactura) + 1;

            this.max = this.facturaForm.value.numeroFactura;
          }
          
          this.facturaForm.controls.numeroFactura.setValue(this.max);
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
          // TODO: revisar este campo
          pendientePago:
            !(String(this.facturaForm.controls.pendientePago.value) === 'true'),
          articulos: this.listaArticulos.map((x) => {
            return {
              ...x,
              iva: Number(x.iva),
              pUnitario: Number(x.pUnitario),
              unidades: Number(x.unidades),
            };
          }),
        })
        .subscribe({
          next: (data) => {
            console.log({ data });
            this.toastSvc.add({
              title: 'Registro Creado',
              type: 'success',
              message: 'Factura creada con éxito',
              life: 3000,
            });
          },
          error: (err) => {
            console.error({ err });
            this.toastSvc.add({
              title: 'Registro fallido',
              type: 'error',
              message: 'Se ha producido un error al intentar crear la factura.',
              life: 3000,
            });
          },
        });
      this.facturaForm.reset({
        fechaExpedicion: new Date().toISOString().split('T')[0],
        fechaCobro: new Date().toISOString().split('T')[0],
        pendientePago: false,
      });
      this.listaArticulos = [];
    }
  }

  // public magias() {
  //   const id = '55234902D';
  //   const mes = '02';
  //   const year = '2024';
  //   this.api.setEndpoint(ApiEndpointEnum.FACTURAS);
  //   this.api
  //     .read(`ivamensual/${id}/${mes}/${year}`)
  //     .subscribe((res) => console.log(res));
  // }
}
