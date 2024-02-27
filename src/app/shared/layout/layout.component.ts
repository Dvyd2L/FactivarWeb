import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToastService } from '@/app/core/services/toast.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements AfterViewInit {
  private readonly toastSvc = inject(ToastService);
  @ViewChild('toastContainer', { read: ViewContainerRef })
  public toast!: ViewContainerRef;
  public toggleMenu() {
    const $sidebar = document.querySelector('#sidebar') as HTMLElement;
    const $layout = document.querySelector('#layout') as HTMLElement;

    // $sidebar?.classList.toggle('hidden');
    $sidebar.style.display =
      $sidebar.style.display === 'none' ? 'block' : 'none';

    $layout.style.gridTemplateColumns =
      $layout.style.gridTemplateColumns === '0fr 6fr' ? '1fr 5fr' : '0fr 6fr';
  }
  ngAfterViewInit(): void {
    this.toastSvc.show(this.toast);
  }
}
