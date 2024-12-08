import { Component } from '@angular/core';
import { availableLanguages } from '../../models/availableLanguagesEnum';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pages } from '../../models/pages';
import { LanguageService } from '../../services/language.service';
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/user.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    TranslatePipe,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 public submit: boolean = false;
  public errors: Record<string, { message: string } | false> = {};
  public language = availableLanguages;
  public availablePages = Pages;
  public signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private navigationService: NavigationService,
    private userService: UserService,
    private router: Router,
  ) {
    this.signInForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.signInForm.statusChanges.subscribe(() => this.checkErrors());
  }

  signIn() {
    this.submit = true;

    // Check errors for all fields
    Object.keys(this.signInForm.controls).forEach(key => {
      this.checkFieldErrors(key, true);
    });

    // If the form is valid
    if (this.signInForm.valid) {
      const user = this.signInForm.value;
      this.userService.signIn(user).subscribe({
        next: (data: any) => {
          if (data.message) {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          // Handle backend errors and map them correctly
          if (err.error?.error) {
            this.errors['form'] = { message: err.error.error };
            console.log(this.errors);
          } 
        }
      });
    }
  }

  // Validate a specific field's errors
  checkFieldErrors(controlName: string, submit: boolean = false) {
    const control = this.signInForm.get(controlName);
    this.errors[controlName] = control && (control.touched || submit) ? this.getFieldError(control) : false;
  }

  // Get error message for a specific control
  private getFieldError(control: AbstractControl): { message: string } | false {
    if (control.hasError('required')) {
      return { message: 'COMMON.ERRORS.REQUIRED' };
    }

    return false;
  }

  // Validate all fields
  private checkErrors() {
    Object.keys(this.signInForm.controls).forEach(key => this.checkFieldErrors(key, this.submit));
  }

  public setTranslations(language: availableLanguages) {
    return this.languageService.switchLanguage(language);
  }

  public setActivePage(page: Pages) {
    this.navigationService.setActivepage(page);
  }

}
