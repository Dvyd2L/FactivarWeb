import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  public title = 'FactivarWeb';

  // constructor(private translate: TranslateService) {
  //   translate.setDefaultLang('es');
  //   translate.use('en');
  // }
}