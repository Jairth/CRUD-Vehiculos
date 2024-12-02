import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
