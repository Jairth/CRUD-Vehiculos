import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { BrnAlertDialogTriggerDirective, BrnAlertDialogContentDirective } from '@spartan-ng/ui-alertdialog-brain';
import { HlmAlertDialogComponent, HlmAlertDialogHeaderComponent, HlmAlertDialogFooterComponent, HlmAlertDialogTitleDirective, HlmAlertDialogDescriptionDirective, HlmAlertDialogContentComponent } from '../../../../../spartan/ui-alertdialog-helm/src';

@Component({
  selector: 'app-delete-staff',
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
  templateUrl: './delete-staff.component.html',
  styleUrl: './delete-staff.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteStaffComponent {
  staffDelete = output();

  onDeleteClient() {
    this.staffDelete.emit();
  }
}
