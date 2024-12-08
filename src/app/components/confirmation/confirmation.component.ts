import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { NavigationService } from '../../services/navigation.service';
import { availableLanguages } from '../../models/availableLanguagesEnum';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Pages } from '../../models/pages';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  public language = availableLanguages
  public availablePages = Pages;

  constructor(private langageService: LanguageService,
    private navigationService: NavigationService
  ) { }

  public setTranslations(language: availableLanguages) {
    return this.langageService.switchLanguage(language)
  }

  public setActivePage(page: Pages) {
    this.navigationService.setActivepage(page);
  }
}
