import { Injectable } from "@angular/core";
import { type SupabaseClient, createClient } from "@supabase/supabase-js";
import { environment } from "../../../environments/environment.development";

@Injectable({
	providedIn: "root",
})
export class SupabaseService {
	supabaseClient: SupabaseClient;
	constructor() {
		this.supabaseClient = createClient(
			environment.SUPABASE_URL,
			environment.SUPABASE_KEY,
		);
	}
	// async signIn(): Promise<any> {
	// 	try {
	// 		const auth = await this.supabaseClient.auth.signInWithPassword({
	// 			email: "admin@admin.com",
	// 			password: "123456a",
	// 		});
	// 		return auth;
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }
}
