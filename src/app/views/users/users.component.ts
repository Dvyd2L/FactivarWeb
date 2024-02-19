import { ApiService } from '@/app/core/api/api.service';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from "@/app/shared/components/loader/loader.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    imports: [JsonPipe, AsyncPipe, LoaderComponent, RouterLink]
})
export class UsersComponent {
  private api = inject(ApiService);
  public response$!: Observable<any[]>;

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.USUARIOS);
    this.response$ = this.api.read<unknown, any[]>();
  }
}
