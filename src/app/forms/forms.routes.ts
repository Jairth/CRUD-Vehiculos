import type { Routes } from "@angular/router";

export default [
	{
		path: "",
		loadComponent: () => import("./ui/layout/layout.component"),
	},
] as Routes;
