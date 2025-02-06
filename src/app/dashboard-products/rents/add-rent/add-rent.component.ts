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
import { RentsForm } from "../../models";
import { RentsService } from "../../services/rents.service";

@Component({
	selector: "app-add-rent",
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
	templateUrl: "./add-rent.component.html",
	styleUrl: "./add-rent.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRentComponent {
	clientAdded = output();
	//Injects
	private readonly rentService = inject(RentsService);
	private fb = inject(FormBuilder);

	rentForm = signal(
		this.fb.group<RentsForm>({
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

	addRent(ctx: any) {
		console.log(this.rentForm().value);
		if (this.rentForm().invalid) return;
		console.log(this.rentForm().value);

		this.rentService
			.addRent({
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
				next: (resp) => {
					console.log(resp);
					this.clientAdded.emit();
					ctx.close();
					this.rentForm().reset();
				},
				error: (error) => {
					console.error(error);
				},
			});
	}
}
