import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, switchMap, map } from 'rxjs';
import { SupabaseService } from '../../shared';
import { Vehiculo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InfoClientsService {

  //Injects
	private readonly http = inject(HttpClient);
	private supabaseClient = inject(SupabaseService).supabaseClient;

	deleteProducts(id: string) {
		return from(
			this.supabaseClient.from("cliente").delete().eq("id", id),
		).pipe(switchMap(() => this.getAllClients()));
	}

	getAllClients() {
		return from(
			this.supabaseClient.from("cliente").select("*").returns<any>(),
		).pipe(map((data: any) => data));
	}

	addProduct(product: {
		categoria: string;
		estado_id: number | null;
		kilometraje: number | null;
		marca: string;
		modelo: string;
		color: string;
		numero_asientos: number;
		soat: string;
		placa: string;
		transmision: string;
		imagen: string | null;
	}) {
		return from(
			this.supabaseClient.from("vehiculo").insert({
				categoria: product.categoria,
				estado_id: product.estado_id,
				kilometraje: product.kilometraje,
				marca: product.marca,
				modelo: product.modelo,
				color: product.color,
				numero_asientos: product.numero_asientos,
				soat: product.soat,
				placa: product.placa,
				transmision: product.transmision,
				imagen: product.imagen,
			}),
		);
	}

	editProduct(product: {
		id: number;
		categoria: string;
		estado_id: number | null;
		kilometraje: number | null;
		marca: string;
		modelo: string;
		color: string;
		numero_asientos: number;
		soat: string;
		placa: string;
		transmision: string;
		imagen: string | null;
	}) {
		const { id, ...dataWithoutId } = product;
		return from(
			this.supabaseClient
				.from("vehiculo")
				.update({
					...dataWithoutId,
				})
				.eq("id", product.id)
				.select(),
		);
	}
}
