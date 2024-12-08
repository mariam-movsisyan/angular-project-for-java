import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { availableLanguages } from '../../models/availableLanguagesEnum';
import { Pages } from '../../models/pages';
import { LanguageService } from '../../services/language.service';
import { NavigationService } from '../../services/navigation.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    TranslatePipe,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public submit: boolean = false;
  public errors: Record<string, { message: string } | false> = {};
  public language = availableLanguages;
  public availablePages = Pages;
  public signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private navigationService: NavigationService,
    private userService: UserService,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });

    this.signUpForm.statusChanges.subscribe(() => this.checkErrors());
  }

  signUp() {
    this.submit = true;

    // Check errors for all fields
    Object.keys(this.signUpForm.controls).forEach(key => {
      this.checkFieldErrors(key, true);
    });

    // If the form is valid
    if (this.signUpForm.valid) {
      const user = this.signUpForm.value;
      this.userService.signUp(user).subscribe({
        next: (data: any) => {
          if (data.message) {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          // Handle backend errors and map them correctly
          console.log(err.error.error);
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
    const control = this.signUpForm.get(controlName);
    this.errors[controlName] = control && (control.touched || submit) ? this.getFieldError(control) : false;
  }

  // Get error message for a specific control
  private getFieldError(control: AbstractControl): { message: string } | false {
    if (control.hasError('required')) {
      return { message: 'COMMON.ERRORS.REQUIRED' };
    }
    if (control.hasError('email')) {
      return { message: 'COMMON.ERRORS.INVALID_EMAIL' };
    }
    if (control.hasError('minlength')) {
      return { message: 'COMMON.ERRORS.SHORT_PASSWORD' };
    }
    if (control.hasError('form')) {
      return { message: 'COMMON.ERRORS.USER_EXISTS' };
    }
    return false;
  }

  // Validate all fields
  private checkErrors() {
    Object.keys(this.signUpForm.controls).forEach(key => this.checkFieldErrors(key, this.submit));
  }

  public setTranslations(language: availableLanguages) {
    return this.languageService.switchLanguage(language);
  }

  public setActivePage(page: Pages) {
    this.navigationService.setActivepage(page);
  }

}
