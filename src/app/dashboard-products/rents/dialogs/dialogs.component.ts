import { ChangeDetectionStrategy, Component, output } from "@angular/core";
import {
	BrnAlertDialogContentDirective,
	BrnAlertDialogTriggerDirective,
} from "@spartan-ng/ui-alertdialog-brain";
import {
	HlmAlertDialogComponent,
	HlmAlertDialogContentComponent,
	HlmAlertDialogDescriptionDirective,
	HlmAlertDialogFooterComponent,
	HlmAlertDialogHeaderComponent,
	HlmAlertDialogTitleDirective,
} from "../../../../../spartan/ui-alertdialog-helm/src";

@Component({
	selector: "app-dialogs",
	standalone: true,
	imports: [
		BrnAlertDialogTriggerDirective,
		BrnAlertDialogContentDirective,
		HlmAlertDialogComponent,
		HlmAlertDialogHeaderComponent,
		HlmAlertDialogFooterComponent,
		HlmAlertDialogTitleDirective,
		HlmAlertDialogDescriptionDirective,
		HlmAlertDialogContentComponent,
	],
	templateUrl: "./dialogs.component.html",
	styleUrl: "./dialogs.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogsComponent {
	rentDelete = output();

	onDeleteRent() {
		this.rentDelete.emit();
	}
}
