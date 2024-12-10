import type { Routes } from "@angular/router";

export const routes: Routes = [
	// {
	// 	path: "checkout",
	// 	loadChildren: () => import("./forms/forms.routes"),
	// },
	{
		path: "dashboard",
		loadChildren: () =>
			import("./dashboard-products/dashboard-products.routes"),
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
