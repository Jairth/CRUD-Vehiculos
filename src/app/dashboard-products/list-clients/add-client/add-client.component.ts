import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { BrnSheetTriggerDirective, BrnSheetContentDirective } from '@spartan-ng/ui-sheet-brain';
import { HlmFormFieldModule } from '../../../../../spartan/ui-formfield-helm/src';
import { HlmInputDirective } from '../../../../../spartan/ui-input-helm/src';
import { HlmSelectModule, HlmSelectImports } from '../../../../../spartan/ui-select-helm/src';
import { HlmSheetComponent, HlmSheetContentComponent } from '../../../../../spartan/ui-sheet-helm/src';
import type { ClientsForm, vehiculoForm } from '../../models';
import { InfoProductsService } from '../../services';
import { InfoClientsService } from '../../services/info-clients.service';

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
	private readonly productService = inject(InfoClientsService);
	private fb = inject(FormBuilder);

	productForm = signal(
		this.fb.group<ClientsForm>({
			dni: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			nombre: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			celular: new FormControl<number | null>(null),
			licencia: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			domicilio: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			rol: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			email: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
		}),
	);

	addProduct(ctx: any) {
		console.log(this.productForm().value);
		if (this.productForm().invalid) return;
		console.log(this.productForm().value);

		this.productService
			.addProduct({
				dni: this.productForm().value.dni!,
				nombre: this.productForm().value.nombre ?? "",
				celular: this.productForm().value.celular ?? 0,
				licencia: this.productForm().value.licencia ?? 0,
				domicilio: this.productForm().value.domicilio ?? "",
				rol: this.productForm().value.rol ?? "",
				email: this.productForm().value.email ?? "",
			})
			.subscribe({
				next: (resp) => {
					console.log(resp);
					this.clientAdded.emit();
					ctx.close();
					this.productForm().reset();
				},
				error: (error) => {
					console.error(error);
				},
			});
	}
}
