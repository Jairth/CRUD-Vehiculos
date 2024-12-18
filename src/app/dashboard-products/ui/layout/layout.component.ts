import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NavComponent } from "../../../shared/components/nav/nav.component";

@Component({
	selector: "app-layout",
	standalone: true,
	imports: [RouterOutlet, NavComponent],
	templateUrl: "./layout.component.html",
	styleUrl: "./layout.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: "wrapper",
	},
})
export default class LayoutComponent {}
