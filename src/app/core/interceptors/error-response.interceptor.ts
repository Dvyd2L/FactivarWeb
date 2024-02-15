import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorResponseInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => next(req).pipe(catchError(handleErrorResponse));

const handleErrorResponse = (error: HttpErrorResponse) =>
  throwError(() => error);
