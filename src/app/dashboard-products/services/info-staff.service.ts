import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, switchMap, map } from 'rxjs';
import { SupabaseService } from '../../shared';
import type { Staff } from '../models/products.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoStaffService {
  //Injects
	private readonly http = inject(HttpClient);
	private supabaseClient = inject(SupabaseService).supabaseClient;

	deleteProducts(id: number) {
		return from(
			this.supabaseClient.from("cliente").delete().eq("id", id),
		).pipe(switchMap(() => this.getAllStaff()));
	}

	getAllStaff() {
		return from(
			this.supabaseClient.from("cliente").select("*").returns<Staff[]>(),
		).pipe(map((data) => data.data));
	}

	addProduct(product: {
		celular: number | null;
		tipo_documento: string | null;
		documento: number | null;
		email: string;
		licencia: number | null;
		nacimiento: string;
		nombre: string;
		preferencia_comunicacion: string;
		administrador_dni: string | null;
	}) {
    console.log(product)
		return from(
			this.supabaseClient.from("cliente").insert({
				celular: product.celular,
				tipo_documento: product.tipo_documento,
				documento: product.documento,
				email: product.email,
				licencia: product.licencia,
				nacimiento: product.nacimiento,
				nombre: product.nombre,
				preferencia_comunicacion: product.preferencia_comunicacion,
				administrador_dni: product.administrador_dni,
			}),
		);
	}

	editProduct(product: {
		id: number;
		celular: number | null;
		tipo_documento: string | null;
		documento: number | null;
		email: string;
		licencia: number | null;
		nacimiento: string;
		nombre: string;
		preferencia_comunicacion: string;
		administrador_dni: string | null;
	}) {
		const { id, ...dataWithoutId } = product;
		return from(
			this.supabaseClient
				.from("cliente")
				.update({
					...dataWithoutId,
				})
				.eq("id", product.id)
				.select(),
		);
	}
}
