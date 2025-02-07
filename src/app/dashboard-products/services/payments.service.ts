import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { from, map, switchMap } from "rxjs";
import { SupabaseService } from "../../shared";
import type { Payment } from "../models";

@Injectable({
	providedIn: "root",
})
export class PaymentsService {
	//Injects
	private readonly http = inject(HttpClient);
	private supabaseClient = inject(SupabaseService).supabaseClient;

	deletePayment(id: number) {
		return from(this.supabaseClient.from("pago").delete().eq("id", id)).pipe(
			switchMap(() => this.getAllPayments()),
		);
	}

	getAllPayments() {
		return from(
			this.supabaseClient.from("pago").select("*").returns<[Payment]>(),
		).pipe(map((data) => data.data));
	}

	addPayment(product: {
		alquiler_id: number | null;
		monto_vehiculo: number | null;
		fecha_pago: string | null;
		metodo_pago: string | null;
		estado_id: number | null;
		monto_igv: number | null;
		monto_total: number | null;
		comprobante: number | null;
	}) {
		return from(
			this.supabaseClient.from("pago").insert({
				alquiler_id: product.alquiler_id,
				monto_vehiculo: product.monto_vehiculo,
				fecha_pago: product.fecha_pago,
				metodo_pago: product.metodo_pago,
				estado_id: product.estado_id,
				monto_igv: product.monto_igv,
				monto_total: product.monto_total,
				comprobante: product.comprobante,
			}),
		);
	}

	editPayment(product: {
		id: number;
		alquiler_id: number | null;
		monto_vehiculo: number | null;
		fecha_pago: string | null;
		metodo_pago: string | null;
		estado_id: number | null;
		monto_igv: number | null;
		monto_total: number | null;
		comprobante: number | null;
	}) {
		const { id, ...dataWithoutId } = product;
		return from(
			this.supabaseClient
				.from("pago")
				.update({
					...dataWithoutId,
				})
				.eq("id", product.id)
				.select(),
		);
	}
}
