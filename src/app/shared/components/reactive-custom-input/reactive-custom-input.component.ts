import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-reactive-custom-input',
  standalone: true,
  imports: [HlmInputDirective, HlmLabelDirective, HlmFormFieldModule],
  templateUrl: './reactive-custom-input.component.html',
  styleUrl: './reactive-custom-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveCustomInputComponent {

}
