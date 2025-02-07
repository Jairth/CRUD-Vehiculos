import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	signal,
} from "@angular/core";
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {
	BrnDialogContentDirective,
	BrnDialogTriggerDirective,
} from "@spartan-ng/ui-dialog-brain";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import {
	HlmDialogComponent,
	HlmDialogContentComponent,
} from "../../../../../spartan/ui-dialog-helm/src";
import { HlmFormFieldModule } from "../../../../../spartan/ui-formfield-helm/src";
import { HlmInputDirective } from "../../../../../spartan/ui-input-helm/src";
import {
	HlmSelectImports,
	HlmSelectModule,
} from "../../../../../spartan/ui-select-helm/src";
import type { Payment, PaymentForm } from "../../models";
import { PaymentsService } from "../../services/payments.service";

@Component({
	selector: "app-edit-payment",
	standalone: true,
	imports: [
		BrnDialogContentDirective,
		BrnDialogTriggerDirective,
		HlmDialogContentComponent,
		HlmDialogComponent,
		HlmFormFieldModule,
		HlmSelectImports,
		HlmSelectModule,
		HlmInputDirective,
		BrnSelectImports,
		ReactiveFormsModule,
	],
	templateUrl: "./edit-payment.component.html",
	styleUrl: "./edit-payment.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPaymentComponent {
	client = input<Payment>();
	clientEdit = output();

	//Injects
	private readonly rentService = inject(PaymentsService);
	private fb = inject(FormBuilder);

	ngOnInit() {
		this.paymentForm().reset(this.client());
	}

	paymentForm = signal(
		this.fb.group<PaymentForm>({
			id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
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

	editPayment(ctx: any) {
		if (this.paymentForm().invalid) return;
		console.log({ EDICION: this.paymentForm().value });

		const formData = { ...this.paymentForm().value };

		// Eliminamos el campo `id` para que no se envíe
		// delete formData.dni;

		this.rentService
			.editPayment({
				id: this.paymentForm().value.id ?? 0,
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
				next: (response) => {
					console.log(response);
					this.clientEdit.emit();
					ctx.close();
				},
				error: (error) => {
					console.error(error);
				},
			});
	}
}
