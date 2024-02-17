import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '@/app/models/interfaces/api';
// import { ButtonModule } from 'primeng/button';
// import { DialogModule } from 'primeng/dialog';
// import { TableModule } from 'primeng/table';
// import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-articulo-factura',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    // FormsModule,
    // DialogModule,
    // TableModule,
    // ToastModule,
    // ButtonModule,
  ],
  templateUrl: './articulo-factura.component.html',
  styleUrl: './articulo-factura.component.css',
})
export class ArticuloFacturaComponent {
  @Input() public articles: IProduct[] = [];
  @Output() public pacos = new EventEmitter<number>();
  @Output() public articulos = new EventEmitter<IProduct>();
  public article = new FormGroup({
    pUnitario: new FormControl({ value: 0, disabled: false }),
    unidades: new FormControl({ value: 0, disabled: false }),
    bImponible: new FormControl({ value: 0, disabled: false }),
    cuotaIva: new FormControl({ value: 0, disabled: false }),
    descripcion: new FormControl({ value: '', disabled: false }),
    importe: new FormControl({ value: 0, disabled: true }),
    iva: new FormControl({ value: 0, disabled: false }),
  });
  public cantidad = '';

  public calculaImporte() {
    this.article.controls.importe.setValue(
      this.article.controls.unidades.value! *
        this.article.controls.pUnitario.value!
    );
  }

  public emiteArticle() {
    if (this.article.valid) {
      this.articulos.emit({ ...this.article.value } as IProduct);
      this.article.reset();
    }
  }

  public removeArticle(art: number) {
    this.pacos.emit(art);
  }
}
