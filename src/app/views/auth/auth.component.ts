import { TraductorService } from '@/app/core/services/traductor.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [],
})
export class AuthComponent implements OnInit {
  private i18n = inject(TraductorService);
  public textoBoton!: string;
  ngOnInit(): void {
    this.i18n.textos$.subscribe(
      ({ auth }) => (this.textoBoton = auth['boton-inicio'])
    );
  }
}
