import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListComponent } from '../../features';
import { TitleComponent } from '../../../shared';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ProductListComponent, TitleComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {

}
