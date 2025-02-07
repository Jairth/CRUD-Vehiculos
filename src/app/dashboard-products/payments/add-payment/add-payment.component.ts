import {
	ChangeDetectionStrategy,
	Component,
	inject,
	output,
	signal,
} from "@angular/core";
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import {
	BrnSheetContentDirective,
	BrnSheetTriggerDirective,
} from "@spartan-ng/ui-sheet-brain";
import { HlmFormFieldModule } from "../../../../../spartan/ui-formfield-helm/src";
import { HlmInputDirective } from "../../../../../spartan/ui-input-helm/src";
import {
	HlmSelectImports,
	HlmSelectModule,
} from "../../../../../spartan/ui-select-helm/src";
import {
	HlmSheetComponent,
	HlmSheetContentComponent,
} from "../../../../../spartan/ui-sheet-helm/src";
import { PaymentForm } from "../../models";
import { PaymentsService } from "../../services/payments.service";

@Component({
	selector: "app-add-payment",
	standalone: true,
	imports: [
		HlmSheetComponent,
		HlmSheetContentComponent,
		BrnSheetTriggerDirective,
		BrnSheetContentDirective,
		HlmSelectModule,
		HlmInputDirective,
		HlmFormFieldModule,
		HlmSelectImports,
		BrnSelectImports,
		ReactiveFormsModule,
	],
	templateUrl: "./add-payment.component.html",
	styleUrl: "./add-payment.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPaymentComponent {
	clientAdded = output();
	//Injects
	private readonly paymentService = inject(PaymentsService);
	private fb = inject(FormBuilder);

	paymentForm = signal(
		this.fb.group<PaymentForm>({
			alquiler_id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			monto_vehiculo: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			fecha_pago: new FormControl<string | null>(null),
			metodo_pago: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			estado_id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			monto_igv: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			monto_total: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			comprobante: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			monto_adicional: new FormControl<number | null>(null),
		}),
	);

	addPayment(ctx: any) {
		console.log(this.paymentForm().value);
		if (this.paymentForm().invalid) return;
		console.log(this.paymentForm().value);

		this.paymentService
			.addPayment({
				alquiler_id: this.paymentForm().value.alquiler_id!,
				monto_vehiculo: this.paymentForm().value.monto_vehiculo ?? null,
				fecha_pago: this.paymentForm().value.fecha_pago ?? "",
				metodo_pago: this.paymentForm().value.metodo_pago ?? "",
				estado_id: this.paymentForm().value.estado_id ?? null,
				monto_igv: this.paymentForm().value.monto_igv ?? null,
				monto_total: this.paymentForm().value.monto_total ?? null,
				comprobante: this.paymentForm().value.comprobante ?? null,
			})
			.subscribe({
				next: (resp) => {
					console.log(resp);
					this.clientAdded.emit();
					ctx.close();
					this.paymentForm().reset();
				},
				error: (error) => {
					console.error(error);
				},
			});
	}
}
