import { StaffForm } from './../../models/products.interface';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { BrnSheetTriggerDirective, BrnSheetContentDirective } from '@spartan-ng/ui-sheet-brain';
import { HlmFormFieldModule } from '../../../../../spartan/ui-formfield-helm/src';
import { HlmInputDirective } from '../../../../../spartan/ui-input-helm/src';
import { HlmSelectModule, HlmSelectImports } from '../../../../../spartan/ui-select-helm/src';
import { HlmSheetComponent, HlmSheetContentComponent } from '../../../../../spartan/ui-sheet-helm/src';
import { provideIcons } from '@ng-icons/core';
import { lucideCross } from '@ng-icons/lucide';
import { InfoStaffService } from '../../services/info-staff.service';

@Component({
  selector: 'app-add-staff',
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
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideCross })],
})
export class AddStaffComponent {
  staffAdded = output();
	//Injects
	private readonly productService = inject(InfoStaffService);
	private fb = inject(FormBuilder);

	productForm = signal(
		this.fb.group<StaffForm>({
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

	addProduct(ctx: any) {
		if (this.productForm().invalid) return;
		console.log(this.productForm().value);

		this.productService.addProduct({
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

					this.staffAdded.emit();
					ctx.close();
					this.productForm().reset();

				},
				error: (error) => {
					console.error(error);
				},
			});
	}
}
