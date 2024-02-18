import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  private readonly colorSchemeQuery = window?.matchMedia?.(
    '(prefers-color-scheme: light)'
  );
  public themeToggle() {
    this.setBootstrapTheme(this.colorSchemeQuery);
    this.colorSchemeQuery.onchange = (event: MediaQueryListEvent) =>
      document?.documentElement.setAttribute(
        'data-bs-theme',
        event.matches ? 'light' : 'dark'
      );
  }
  private readonly setBootstrapTheme = (mediaQueryList: MediaQueryList) =>
    mediaQueryList.matches
      ? document?.documentElement.setAttribute('data-bs-theme', 'light')
      : document?.documentElement.setAttribute('data-bs-theme', 'dark');
}
