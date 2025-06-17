import { HttpInterceptorFn } from '@angular/common/http';
import {constants} from '../constants';
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(constants.token);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
