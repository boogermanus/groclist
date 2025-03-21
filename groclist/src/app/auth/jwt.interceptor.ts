import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
// import { tap } from 'rxjs';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';

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
  // return next(req).pipe(tap(event => {
  //   if(event instanceof HttpResponse) {
  //     if(event.status === 401) {
  //       localStorage.clear();
  //       inject(Router).navigate(['/login']);
  //     }
  //   }
  //   return event;
  // }));

  return next(req);
};
