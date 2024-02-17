import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnChanges {
  @ViewChild('modalWindow', { static: false })
  public modal!: ElementRef<HTMLDialogElement>;
  @Input({ alias: 'show' }) public showModal: boolean = false;
  /**
   * Cambia el estado de visibilidad de la ventana modal.
   */
  public toggleVisibility() {
    if (this.modal) {
      this.showModal
        ? this.modal.nativeElement.showModal()
        : this.modal.nativeElement.close();
    }
  }
  /**
   * Cierra el diálogo.
   */
  public close() {
    this.modal.nativeElement.close();
  }
  ngOnChanges(): void {
    this.toggleVisibility();
  }
}
