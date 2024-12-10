import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
	selector: "app-layout",
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: "./layout.component.html",
	styleUrl: "./layout.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: "container",
	},
})
export default class LayoutComponent {}
