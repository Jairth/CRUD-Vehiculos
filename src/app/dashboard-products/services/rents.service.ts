import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { from, map, switchMap } from "rxjs";
import { SupabaseService } from "../../shared";
import type { Rents } from "../models";

@Injectable({
	providedIn: "root",
})
export class RentsService {
	//Injects
	private readonly http = inject(HttpClient);
	private supabaseClient = inject(SupabaseService).supabaseClient;

	deleteRent(id: number) {
		return from(
			this.supabaseClient.from("alquiler").delete().eq("id", id),
		).pipe(switchMap(() => this.getAllRents()));
	}

	getAllRents() {
		return from(
			this.supabaseClient.from("alquiler").select("*").returns<Rents[]>(),
		).pipe(map((data) => data.data));
	}

	addRent(product: {
		fecha_inicio: number | null;
		fecha_fin: string | null;
		adicional: number | null;
		seguro: number | null;
		lugar_entrega: string | null;
		garantia: string | null;
		cliente_id: number | null;
		vehiculo_id: number | null;
		estado_id: number | null;
	}) {
		return from(
			this.supabaseClient.from("alquiler").insert({
				fecha_inicio: product.fecha_inicio,
				fecha_fin: product.fecha_fin,
				adicional: product.adicional,
				seguro: product.seguro,
				lugar_entrega: product.lugar_entrega,
				garantia: product.garantia,
				cliente_id: product.cliente_id,
				vehiculo_id: product.vehiculo_id,
				estado_id: product.estado_id,
			}),
		);
	}

	editRent(product: {
		id: number;
		fecha_inicio: number | null;
		fecha_fin: string | null;
		adicional: number | null;
		seguro: number | null;
		lugar_entrega: string | null;
		garantia: string | null;
		cliente_id: number | null;
		vehiculo_id: number | null;
		estado_id: number | null;
	}) {
		const { id, ...dataWithoutId } = product;
		return from(
			this.supabaseClient
				.from("alquiler")
				.update({
					...dataWithoutId,
				})
				.eq("id", product.id)
				.select(),
		);
	}
}
