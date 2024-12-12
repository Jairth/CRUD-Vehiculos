import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { SesionsService } from '../services/sesions.service';
import { ToastrService } from 'ngx-toastr';

// export const authGuard: CanActivateFn = (route, state) => {
//   console.log(route)
//   const token = localStorage.getItem('sb-ycmtrsipzymqgigyfhnu-auth-token');

//   if(token) {
//     const tokenAccess = JSON.parse(token).access_token
//     if (tokenAccess !== null) {
//       return true
//     }
//   }
//   return false;
// };

export const authGuard: CanActivateFn = (route, state) => {
  // console.log("Ruta:", route);
  const tokenString = localStorage.getItem('sb-ycmtrsipzymqgigyfhnu-auth-token');
  const authService = inject(SesionsService);
  const toast = inject(ToastrService)

  if (tokenString) {
    try {
      const token = JSON.parse(tokenString);
      if (token && token.access_token) {
        // console.log("Token válido:", token.access_token);
        return true;
      }
      console.log("Token mal formado o sin access_token");

    } catch (error) {
      console.error("Error al parsear el token:", error);
    }
  } else {
      console.log("No hay token en localStorage");
  }

  console.log("Acceso denegado. Redirigiendo...");
  toast.error('Acceso denegado. Debes iniciar sesión')
  authService.redirectToLogin();
  return false;
};
