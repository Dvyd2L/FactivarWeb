import { FooterComponent } from '@/app/shared/layout/components/footer/footer.component';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TraductorService } from '@/app/core/services/traductor.service';
import { Home } from '@/app/models/interfaces/traductor';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private traductor = inject(TraductorService);
  public textos!: Home;

  ngOnInit(): void {
    this.traductor.textos$.subscribe(({ home }) => (this.textos = home));
  }
}
