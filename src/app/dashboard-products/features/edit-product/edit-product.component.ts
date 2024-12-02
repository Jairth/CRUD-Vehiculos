import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
	signal,
} from "@angular/core";
import {
	BrnDialogContentDirective,
	BrnDialogTriggerDirective,
} from "@spartan-ng/ui-dialog-brain";
import {
	HlmDialogComponent,
	HlmDialogContentComponent,
} from "@spartan-ng/ui-dialog-helm";

import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { HlmFormFieldModule } from "@spartan-ng/ui-formfield-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import { HlmSelectImports, HlmSelectModule } from "@spartan-ng/ui-select-helm";
import type { Vehiculo, vehiculoForm } from "../../models";
import { InfoProductsService } from "../../services";

@Component({
	selector: "app-edit-product",
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
	templateUrl: "./edit-product.component.html",
	styleUrl: "./edit-product.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent {
	product = input<Vehiculo>();
	productEdit = output();

	//Injects
	private readonly productService = inject(InfoProductsService);
	private fb = inject(FormBuilder);

	ngOnInit() {
		this.productForm().reset(this.product());
	}

	productForm = signal(
		this.fb.group<vehiculoForm>({
			id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			categoria: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			imagen: new FormControl<string | null>(null),
			color: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			estado_id: new FormControl<number | null>(1, {
				validators: Validators.required,
			}),
			kilometraje: new FormControl<number | null>(1, {
				validators: Validators.required,
			}),
			marca: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			modelo: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			numero_asientos: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			soat: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			placa: new FormControl<string | null>(null),
			transmision: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
		}),
	);

	editProduct(ctx: any) {
		if (this.productForm().invalid) return;
		console.log({ EDICION: this.productForm().value });

		const formData = { ...this.productForm().value };

		// Eliminamos el campo `id` para que no se envíe
		delete formData.id;

		this.productService
			.editProduct({
				id: this.productForm().value.id ?? 0,
				categoria: this.productForm().value.categoria ?? "",
				estado_id: this.productForm().value.estado_id!,
				kilometraje: this.productForm().value.kilometraje!,
				marca: this.productForm().value.marca ?? "",
				modelo: this.productForm().value.modelo ?? "",
				numero_asientos: this.productForm().value.numero_asientos ?? 0,
				color: this.productForm().value.color ?? "",
				soat: this.productForm().value.soat ?? "",
				placa: this.productForm().value.placa ?? "",
				transmision: this.productForm().value.transmision ?? "",
				imagen: this.productForm().value.imagen!,
			})
			.subscribe({
				next: (resp) => {
					console.log(resp);
					this.productEdit.emit();
					ctx.close();
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
}
