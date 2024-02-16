import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UUID } from 'node:crypto';
/**
 * Prueba unitaria para el servicio UserService.
 */
describe('UsersService', <T extends { Sid: UUID; token: string }>() => {
  let service: UserService<T>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService<T>);
  });
  /**
   * Prueba si el servicio ha sido creado correctamente.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
