import { Directive, type DoCheck, Inject, Injector, Input, computed, effect, inject, input, signal } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { hlm } from '@spartan-ng/ui-core';
import { BrnFormFieldControl } from '@spartan-ng/ui-form-field-brain';
import { ErrorStateMatcher, ErrorStateTracker } from '@spartan-ng/ui-forms-brain';

import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const inputVariants = cva(
  'input-custom disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: '',
        sm: '',
        lg: '',
      },
      error: {
        auto: '[&.ng-invalid.ng-touched]:text-destructive [&.ng-invalid.ng-touched]:border-destructive [&.ng-invalid.ng-touched]:focus-visible:ring-destructive',
        true: 'text-destructive border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      error: 'auto',
    },
  },
);
type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: '[hlmInput]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
  providers: [
    {
      provide: BrnFormFieldControl,
      useExisting: HlmInputDirective,
    },
  ],
})
export class HlmInputDirective implements BrnFormFieldControl, DoCheck {
  private readonly _size = signal<InputVariants['size']>('default');
  @Input()
  set size(value: InputVariants['size']) {
    this._size.set(value);
  }

  private readonly _error = signal<InputVariants['error']>('auto');
  @Input()
  set error(value: InputVariants['error']) {
    this._error.set(value);
  }

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(inputVariants({ size: this._size(), error: this._error() }), this.userClass()),
  );

  private injector = inject(Injector)

  ngControl: NgControl | null = this.injector.get(NgControl, null);

  errorStateTracker: ErrorStateTracker;

  private defaultErrorStateMatcher = inject(ErrorStateMatcher);
  private parentForm = inject(NgForm, { optional: true });
  private parentFormGroup = inject(FormGroupDirective, { optional: true });

  errorState = computed(() => this.errorStateTracker.errorState());

  constructor() {
    this.errorStateTracker = new ErrorStateTracker(
      this.defaultErrorStateMatcher,
      this.ngControl,
      this.parentFormGroup,
      this.parentForm,
    );

    effect(
      () => {
        if (this.ngControl) {
          this.error = this.errorStateTracker.errorState();
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngDoCheck() {
    this.errorStateTracker.updateErrorState();
  }
}
