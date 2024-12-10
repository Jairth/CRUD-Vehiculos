import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	signal,
	viewChild,
} from "@angular/core";
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
	BrnAlertDialogContentDirective,
	BrnAlertDialogTriggerDirective,
} from "@spartan-ng/ui-alertdialog-brain";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import {
	HlmAlertDialogComponent,
	HlmAlertDialogContentComponent,
	HlmAlertDialogDescriptionDirective,
	HlmAlertDialogFooterComponent,
	HlmAlertDialogHeaderComponent,
	HlmAlertDialogTitleDirective,
} from "../../../../../spartan/ui-alertdialog-helm/src";
import { HlmFormFieldModule } from "../../../../../spartan/ui-formfield-helm/src";
import { HlmInputDirective } from "../../../../../spartan/ui-input-helm/src";
import {
	HlmSelectImports,
	HlmSelectModule,
} from "../../../../../spartan/ui-select-helm/src";
import { SesionsService } from "../../services/sesions.service";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmFormFieldModule,
		HlmSelectImports,
		HlmSelectModule,
		HlmInputDirective,
		BrnSelectImports,
		RouterLink,
		// BrnAlertDialogTriggerDirective,
		BrnAlertDialogContentDirective,
		HlmAlertDialogComponent,
		HlmAlertDialogHeaderComponent,
		HlmAlertDialogFooterComponent,
		HlmAlertDialogTitleDirective,
		HlmAlertDialogDescriptionDirective,
		HlmAlertDialogContentComponent,
	],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
	alertDialog = viewChild<BrnAlertDialogTriggerDirective>("alertDialog");

	//Injects
	private readonly sesionsService = inject(SesionsService);
	private fb = inject(FormBuilder);
	private cdr = inject(ChangeDetectorRef);

	loginForm = signal(
		this.fb.group({
			email: new FormControl<string>("", {
				validators: Validators.required,
			}),
			password: new FormControl<string>("", {
				validators: Validators.required,
			}),
		}),
	);

	// signUp() {
	// 	console.log(this.loginForm().value);
	// 	if (this.loginForm().invalid) return;

	// 	const { email, password } = this.loginForm().value;

	// 	this.sesionsService.signUp(email!, password!);
	// }

	async signUp() {
		if (this.loginForm().invalid) return;

		const { email, password } = this.loginForm().value;
		const result = await this.sesionsService.signUp(email!, password!);

		if (result.success) {
			this.alertDialog()!.open();
			this.resetForm();
		} else {
			console.error("Error durante el registro:", result.error);
		}
	}

	resetForm() {
		const form = this.loginForm();
		form.reset();
		form.markAsPristine();
		form.markAsUntouched();
	}
}
