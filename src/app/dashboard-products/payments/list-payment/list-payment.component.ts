import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-payment',
  standalone: true,
  imports: [],
  templateUrl: './list-payment.component.html',
  styleUrl: './list-payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPaymentComponent {

}
