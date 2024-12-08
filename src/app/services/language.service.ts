import { Injectable } from '@angular/core';
import { ENG } from '../translations/english';
import { HY } from '../translations/armenian';
import { availableLanguages } from '../models/availableLanguagesEnum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: any = ENG

  public allTranslations = {
    ENG,
    HY
  }

  public setLanguage(language: availableLanguages): void {
    this.currentLanguage = this.allTranslations[language]
  }

  switchLanguage(language: availableLanguages): void {
    this.currentLanguage = this.allTranslations[language]
  }
  public getTranslation() {
    return this.currentLanguage
  }
}
