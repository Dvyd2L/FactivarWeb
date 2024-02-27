import { ToastService } from '@/app/core/services/toast.service';
import { TraductorService } from '@/app/core/services/traductor.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [],
})
export class AuthComponent implements OnInit, AfterViewInit {
  private toastSvc = inject(ToastService);
  private i18n = inject(TraductorService);
  public textoBoton!: string;
  @ViewChild('toastContainer', { read: ViewContainerRef })
  public toast!: ViewContainerRef;

  ngOnInit(): void {
    this.i18n.textos$.subscribe(
      ({ auth }) => (this.textoBoton = auth['boton-inicio'])
    );
  }

  ngAfterViewInit(): void {
    this.toastSvc.show(this.toast);
  }
}
