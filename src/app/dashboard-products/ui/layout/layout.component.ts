import { RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TitleComponent } from '../../../shared';
import ProductListComponent from '../../features/product-list/product-list.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {

}
