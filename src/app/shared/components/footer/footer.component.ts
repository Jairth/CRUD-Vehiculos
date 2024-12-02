import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}
