import { Component, ContentChild, type ElementRef, ViewChild, computed, inject, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/ui-core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnSelectComponent, BrnSelectTriggerDirective } from '@spartan-ng/ui-select-brain';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const selectTriggerVariants = cva(
  'select-custom disabled:cursor-not-allowed disabled:opacity-50',
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
type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;

@Component({
  selector: 'hlm-select-trigger',
  standalone: true,
  imports: [BrnSelectTriggerDirective, HlmIconComponent],
  providers: [provideIcons({ lucideChevronDown })],
  template: `
		<button [class]="_computedClass()" #button hlmInput brnSelectTrigger type="button">
			<ng-content />
			@if (icon) {
				<ng-content select="hlm-icon" />
			} @else {
				<hlm-icon class="ml-2 h-4 w-4 flex-none" name="lucideChevronDown" />
			}
		</button>
	`,
})
export class HlmSelectTriggerComponent {
  @ViewChild('button', { static: true })
  public buttonEl!: ElementRef;

  @ContentChild(HlmIconComponent, { static: false })
  protected icon!: HlmIconComponent;

  protected readonly brnSelect = inject(BrnSelectComponent, { optional: true });

  public readonly _size = input<SelectTriggerVariants['size']>('default');
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  protected _computedClass = computed(() =>
    hlm(selectTriggerVariants({ size: this._size(), error: this.brnSelect?.errorState() }), this.userClass()),
  );
}
