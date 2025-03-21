import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if(token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // trying to figure out how to redirect on invalid auth.
  // return next(req).pipe(map(event => {
  //   if(event instanceof HttpResponse) {
  //     console.log(event);
  //   }
  //   return event;
  // }))

  return next(req);
};
