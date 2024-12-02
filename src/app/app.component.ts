import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports, HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { FooterComponent, HeaderComponent, SupabaseService } from './shared';
import { NavComponent } from './shared/components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    HlmFormFieldModule,
    HlmSelectModule,
    HlmInputDirective,
    HlmSelectImports,
    BrnSelectImports,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reactiveForms';
  private supabaseService = inject(SupabaseService);

  async ngOnInit() {
    try {
      const auth = await this.supabaseService.signIn();
      if (auth.error) {
        console.log('Error al autenticar', auth.error.message);
      } else {
        console.log('Sesión iniciada', auth);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
