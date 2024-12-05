import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { BrnAlertDialogTriggerDirective, BrnAlertDialogContentDirective } from '@spartan-ng/ui-alertdialog-brain';
import { HlmAlertDialogComponent, HlmAlertDialogHeaderComponent, HlmAlertDialogFooterComponent, HlmAlertDialogTitleDirective, HlmAlertDialogDescriptionDirective, HlmAlertDialogContentComponent } from '../../../../../spartan/ui-alertdialog-helm/src';

@Component({
  selector: 'app-dialogs',
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
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogsComponent {
  clientDelete = output();

  onDeleteClient() {
    this.clientDelete.emit();
  }
}
