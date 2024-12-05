import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { BrnSheetTriggerDirective, BrnSheetContentDirective } from '@spartan-ng/ui-sheet-brain';
import { HlmFormFieldModule } from '../../../../../spartan/ui-formfield-helm/src';
import { HlmInputDirective } from '../../../../../spartan/ui-input-helm/src';
import { HlmSelectModule, HlmSelectImports } from '../../../../../spartan/ui-select-helm/src';
import { HlmSheetComponent, HlmSheetContentComponent } from '../../../../../spartan/ui-sheet-helm/src';
import type { vehiculoForm } from '../../models';
import { InfoProductsService } from '../../services';

@Component({
  selector: 'app-add-client',
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
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddClientComponent {
  clientAdded = output();
	//Injects
	private readonly productService = inject(InfoProductsService);
	private fb = inject(FormBuilder);

	productForm = signal(
		this.fb.group<vehiculoForm>({
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

	addProduct(ctx: any) {
		console.log(this.productForm().value);
		if (this.productForm().invalid) return;
		console.log(this.productForm().value);

		const placaRegex = /^[A-Z]{3}-\d{3}$/;
		const placa = this.productForm().value.placa ?? "";
		if (!placaRegex.test(placa)) {
			this.productForm().get("placa")?.setErrors({ invalidFormat: true });
			return;
		}

		this.productService
			.addProduct({
				categoria: this.productForm().value.categoria ?? "",
				estado_id: this.productForm().value.estado_id!,
				kilometraje: this.productForm().value.kilometraje!,
				marca: this.productForm().value.marca ?? "",
				modelo: this.productForm().value.modelo ?? "",
				color: this.productForm().value.color ?? "",
				numero_asientos: this.productForm().value.numero_asientos ?? 0,
				soat: this.productForm().value.soat ?? "",
				placa: this.productForm().value.placa ?? "",
				transmision: this.productForm().value.transmision ?? "",
				imagen: this.productForm().value.imagen!,
			})
			.subscribe({
				next: (resp) => {
					console.log(resp);
					const { estado_id, kilometraje } = this.productForm().value;
					this.clientAdded.emit();
					ctx.close();
					this.productForm().reset();
					this.productForm().patchValue({
						estado_id,
						kilometraje,
					});
				},
				error: (error) => {
					console.error(error);
				},
			});
	}
}
