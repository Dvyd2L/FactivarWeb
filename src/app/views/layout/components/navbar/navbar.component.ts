import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
