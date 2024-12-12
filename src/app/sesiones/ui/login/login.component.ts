import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import { HlmFormFieldModule } from "../../../../../spartan/ui-formfield-helm/src";
import { HlmInputDirective } from "../../../../../spartan/ui-input-helm/src";
import {
	HlmSelectImports,
	HlmSelectModule,
} from "../../../../../spartan/ui-select-helm/src";
import { SesionsService } from "../../services/sesions.service";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [
		ReactiveFormsModule,
		HlmFormFieldModule,
		HlmSelectImports,
		HlmSelectModule,
		HlmInputDirective,
		BrnSelectImports,
		RouterLink,
	],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
	//Injects
	private readonly sesionsService = inject(SesionsService);
	private fb = inject(FormBuilder);
	private router = inject(Router);

	loginForm = signal(
		this.fb.group({
			email: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
			password: new FormControl<string | null>(null, {
				validators: Validators.required,
			}),
		}),
	);

	async signIn() {
		if (this.loginForm().invalid) return;

		const { email, password } = this.loginForm().value;
		const result = await this.sesionsService.logIn(email!, password!);

		console.log(result)
		if (result.data) {
			this.resetForm();
			this.router.navigate(["/dashboard"]);
		} else {
			this.resetForm();
			console.error("Error durante el inicio de sesión:", result.error);
		}
	}

	resetForm() {
		const form = this.loginForm();
		form.reset();
		form.markAsPristine();
		form.markAsUntouched();
	}
}
