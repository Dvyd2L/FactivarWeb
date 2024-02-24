import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkComponent } from '../link/link.component';
import { TraductorService } from '@/app/core/services/traductor.service';
import { Navbar } from '@/app/models/interfaces/traductor';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private traductor = inject(TraductorService);
  public textos!: Navbar;

  ngOnInit(): void {
    this.traductor.textos$.subscribe(({ navbar }) => (this.textos = navbar));
  }
}
