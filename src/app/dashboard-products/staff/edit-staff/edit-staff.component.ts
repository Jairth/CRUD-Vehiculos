import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmDialogContentComponent, HlmDialogComponent } from '../../../../../spartan/ui-dialog-helm/src';
import { HlmFormFieldModule } from '../../../../../spartan/ui-formfield-helm/src';
import { HlmInputDirective } from '../../../../../spartan/ui-input-helm/src';
import { HlmSelectImports, HlmSelectModule } from '../../../../../spartan/ui-select-helm/src';
import { Staff, StaffForm, Vehiculo, vehiculoForm } from '../../models';
import { InfoStaffService } from '../../services/info-staff.service';

@Component({
  selector: 'app-edit-staff',
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
  templateUrl: './edit-staff.component.html',
  styleUrl: './edit-staff.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditStaffComponent {
  staff = input<Staff>();
	staffEdit = output();

	//Injects
	private readonly productService = inject(InfoStaffService);
	private fb = inject(FormBuilder);

	ngOnInit() {
		this.productForm().reset(this.staff());
	}

	productForm = signal(
		this.fb.group<StaffForm>({
			id: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			celular: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			tipo_documento: new FormControl<string | null>(null),
			documento: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			email: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			licencia: new FormControl<number | null>(null, {
				validators: Validators.required,
			}),
			nacimiento: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			nombre: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			preferencia_comunicacion: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			administrador_dni: new FormControl<string | null>(null),
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
				celular: this.productForm().value.celular ?? null,
				tipo_documento: this.productForm().value.tipo_documento ?? "",
				documento: this.productForm().value.documento ?? 0,
				email: this.productForm().value.email ?? "",
				licencia: this.productForm().value.licencia ?? 0,
				nacimiento: this.productForm().value.nacimiento ?? "",
				nombre: this.productForm().value.nombre ?? "",
				preferencia_comunicacion: this.productForm().value.preferencia_comunicacion ?? "",
				administrador_dni: this.productForm().value.administrador_dni ?? null,
			})
			.subscribe({
				next: (resp) => {
					console.log(resp);
					this.staffEdit.emit();
					ctx.close();
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
}
