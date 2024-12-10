import type { Routes } from "@angular/router";

export default [
	{
		path: "",
		loadComponent: () => import("./ui/layout/layout.component"),
		children: [
			{
				path: "login",
				loadComponent: () => import("./ui/login/login.component"),
			},
			{
				path: "register",
				loadComponent: () => import("./ui/register/register.component"),
			},
			{
				path: "**",
				pathMatch: "full",
				redirectTo: "login",
			},
		],
	},
] as Routes;
