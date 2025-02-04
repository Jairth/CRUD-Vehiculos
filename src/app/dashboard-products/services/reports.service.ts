import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '../../shared';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private supabaseClient = inject(SupabaseService).supabaseClient;

  getPayments() {
    return from(
      this.supabaseClient.from('pago').select('*').returns()
    );
  }

  getReturns() {
    return from(
      this.supabaseClient.from('devolucion').select('*').returns()
    );
  }

  getRents() {
    return from(
      this.supabaseClient.from('alquiler').select('*').returns()
    );
  }
}
