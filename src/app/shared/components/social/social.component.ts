import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialComponent {}
