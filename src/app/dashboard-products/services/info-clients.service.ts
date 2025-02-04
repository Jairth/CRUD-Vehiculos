import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, switchMap, map } from 'rxjs';
import { SupabaseService } from '../../shared';
import type { Clients, Vehiculo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InfoClientsService {

  //Injects
	private readonly http = inject(HttpClient);
	private supabaseClient = inject(SupabaseService).supabaseClient;

	deleteProducts(id: string) {
		return from(
			this.supabaseClient.from("administrador").delete().eq("dni", id),
		).pipe(switchMap(() => this.getAllClients()));
	}

	getAllClients() {
		return from(
			this.supabaseClient.from("administrador").select("*").returns<Clients[]>(),
		).pipe(map((data) => data.data));
	}

	addProduct(product: {
		dni: number | null;
		nombre: string | null;
		celular: number | null;
		licencia: number | null;
		domicilio: string | null;
		rol: string | null;
		email: string | null;
	}) {
		return from(
			this.supabaseClient.from("administrador").insert({
				dni: product.dni,
				nombre: product.nombre,
				celular: product.celular,
				licencia: product.licencia,
				domicilio: product.domicilio,
				rol: product.rol,
				email: product.email,
			}),
		);
	}

	editProduct(product: {
		id: number;
		dni: number | null;
		nombre: string | null;
		celular: number | null;
		licencia: number | null;
		domicilio: string | null;
		rol: string | null;
		email: string | null;
	}) {
		const { id, ...dataWithoutId }  = product;
		return from(
			this.supabaseClient
				.from("administrador")
				.update({
					...dataWithoutId
				})
				.eq("id", product.id)
				.select(),
		);
	}
}
