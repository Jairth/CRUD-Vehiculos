import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogsComponent {

}
