import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reactive-custom-select',
  standalone: true,
  imports: [],
  templateUrl: './reactive-custom-select.component.html',
  styleUrl: './reactive-custom-select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveCustomSelectComponent {

}
