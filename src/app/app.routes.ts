import type { Routes } from "@angular/router";
import { authGuard } from "./sesiones/guards/auth.guard";

export const routes: Routes = [
	// {
	// 	path: "checkout",
	// 	loadChildren: () => import("./forms/forms.routes"),
	// },
	{
		path: "dashboard",
		loadChildren: () =>
			import("./dashboard-products/dashboard-products.routes"),
		canActivate: [authGuard]
	},
	{
		path: "sesions",
		loadChildren: () => import("./sesiones/sesions.routes"),
	},
	{
		path: "**",
		pathMatch: "full",
		redirectTo: "sesions",
	},
];
