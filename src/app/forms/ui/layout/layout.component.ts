import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent, HeaderComponent, RecentPostComponent, TitleComponent } from '../../../shared';
import { CheckoutComponent } from '../checkout';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TitleComponent, RecentPostComponent, CheckoutComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {

}
