import { ApiService } from '@/app/api/api.service';
import { ApiEndpointEnum } from '@/app/enums/api.enum';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private api = inject(ApiService);
  public response$!: Observable<any[]>;

  ngOnInit(): void {
    this.api.setEndpoint(ApiEndpointEnum.USUARIOS);
    this.response$ = this.api.read<unknown, any[]>();
  }
}
