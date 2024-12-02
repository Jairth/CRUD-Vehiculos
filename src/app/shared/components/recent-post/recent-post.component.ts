import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocialComponent } from '../social/social.component';

@Component({
  selector: 'app-recent-post',
  standalone: true,
  imports: [SocialComponent],
  templateUrl: './recent-post.component.html',
  styleUrl: './recent-post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentPostComponent {

}
