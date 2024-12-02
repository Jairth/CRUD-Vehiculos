import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { AsyncPipe } from '@angular/common';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { SocialComponent } from '../../../shared';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    HlmInputDirective,
    HlmLabelDirective,
    BrnSelectImports,
    HlmSelectImports,
    SocialComponent,
    HlmFormFieldModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  //Injects
  private readonly countriesService = inject(CountriesService);
  private readonly fb = inject(FormBuilder);

  //public countries$ = this.countriesService.getCountries();
  public countries = toSignal(this.countriesService.getCountries());
  ngOnInit() {
    document.body.classList.add('checkout-active');
  }

  ngOnDestroy() {
    document.body.classList.remove('checkout-active');
  }

  form = signal(
    this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      country: ['', Validators.required],
      streeAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      orderNotes: [''],
    }),
  );
}
