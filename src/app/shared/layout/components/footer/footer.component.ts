import { TraductorService } from '@/app/core/services/traductor.service';
import { Footer } from '@/app/models/interfaces/traductor';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  private traductor = inject(TraductorService);
  public textos!: Footer;

  ngOnInit(): void {
    this.traductor.textos$.subscribe(({ footer }) => (this.textos = footer));
  }
}
