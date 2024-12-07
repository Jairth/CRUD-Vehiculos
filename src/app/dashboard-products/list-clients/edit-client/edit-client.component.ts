import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Clients, ClientsForm, Vehiculo, vehiculoForm } from '../../models';
import { InfoProductsService } from '../../services';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmDialogContentComponent, HlmDialogComponent } from '../../../../../spartan/ui-dialog-helm/src';
import { HlmFormFieldModule } from '../../../../../spartan/ui-formfield-helm/src';
import { HlmInputDirective } from '../../../../../spartan/ui-input-helm/src';
import { HlmSelectImports, HlmSelectModule } from '../../../../../spartan/ui-select-helm/src';
import { InfoClientsService } from '../../services/info-clients.service';

@Component({
  selector: 'app-edit-client',
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
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditClientComponent {
  client = input<Clients>();
	clientEdit = output();

	//Injects
	private readonly productService = inject(InfoClientsService);
	private fb = inject(FormBuilder);

	ngOnInit() {
		this.productForm().reset(this.client());
	}

	productForm = signal(
		this.fb.group<ClientsForm>({
			dni: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			nombre: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			celular: new FormControl<number | null>(null),
			licencia: new FormControl<number | null>(1, {
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

	editProduct(ctx: any) {
		if (this.productForm().invalid) return;
		console.log({ EDICION: this.productForm().value });

		const formData = { ...this.productForm().value };

		// Eliminamos el campo `id` para que no se envíe
		delete formData.dni;

		this.productService
			.editProduct({
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
					this.clientEdit.emit();
					ctx.close();
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
}
