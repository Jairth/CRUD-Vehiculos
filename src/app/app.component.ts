import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { HlmFormFieldModule } from "@spartan-ng/ui-formfield-helm";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import { HlmSelectImports, HlmSelectModule } from "@spartan-ng/ui-select-helm";
import { SupabaseService } from "./shared";
import { NavComponent } from "./shared/components/nav/nav.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		ReactiveFormsModule,
		HlmFormFieldModule,
		HlmSelectModule,
		HlmSelectImports,
		BrnSelectImports,
		NavComponent,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	host: {
		class: "wrapper",
	},
})
export class AppComponent {
	title = "Dashboard Autos SAC";
	private supabaseService = inject(SupabaseService);

	async ngOnInit() {
		try {
			const auth = await this.supabaseService.signIn();
			if (auth.error) {
				console.log("Error al autenticar", auth.error.message);
			} else {
				console.log("Sesión iniciada", auth);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
