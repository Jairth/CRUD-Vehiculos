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
import type { Rents, RentsForm } from "../../models";
import { RentsService } from "../../services/rents.service";

@Component({
	selector: "app-edit-rent",
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
	templateUrl: "./edit-rent.component.html",
	styleUrl: "./edit-rent.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRentComponent {
	client = input<Rents>();
	clientEdit = output();

	//Injects
	private readonly rentService = inject(RentsService);
	private fb = inject(FormBuilder);

	ngOnInit() {
		this.rentForm().reset(this.client());
	}

	rentForm = signal(
		this.fb.group<RentsForm>({
			id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			fecha_inicio: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			fecha_fin: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			adicional: new FormControl<number | null>(null),
			seguro: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			lugar_entrega: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			garantia: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			cliente_id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			vehiculo_id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			estado_id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
		}),
	);

	editRent(ctx: any) {
		if (this.rentForm().invalid) return;
		console.log({ EDICION: this.rentForm().value });

		const formData = { ...this.rentForm().value };

		// Eliminamos el campo `id` para que no se envíe
		// delete formData.dni;

		this.rentService
			.editRent({
				id: this.rentForm().value.id ?? 0,
				fecha_inicio: this.rentForm().value.fecha_inicio!,
				fecha_fin: this.rentForm().value.fecha_fin ?? "",
				adicional: this.rentForm().value.adicional ?? 0,
				seguro: this.rentForm().value.seguro ?? 0,
				lugar_entrega: this.rentForm().value.lugar_entrega ?? "",
				garantia: this.rentForm().value.garantia ?? "",
				cliente_id: this.rentForm().value.cliente_id ?? null,
				vehiculo_id: this.rentForm().value.vehiculo_id ?? null,
				estado_id: this.rentForm().value.estado_id ?? null,
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
