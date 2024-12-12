import { Injectable, inject } from "@angular/core";
import { SupabaseService } from "../../shared";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class SesionsService {
	private supabaseClient = inject(SupabaseService).supabaseClient;
	private router = inject(Router)

	async signUp(
		email: string,
		password: string,
	): Promise<{ success: boolean; error?: any }> {
		try {
			const { data } = await this.supabaseClient.auth.signUp({
				email: email,
				password: password,
			});
			// console.log(data);
			return { success: true };
		} catch (error) {
			// console.log(error);
			return { success: true };
		}
	}

	async logIn(
		email: string,
		password: string,
	) {
			const {data, error} = await this.supabaseClient.auth.signInWithPassword({
				email: email,
				password: password,
			});

			if(error?.code === "invalid_credentials") {
				return { error: error };
			}
				return { data: data };
	}

	redirectToLogin(): void {
    this.router.navigate(['/sessions']);
  }
}
