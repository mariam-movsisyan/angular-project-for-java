import { Pipe, PipeTransform } from "@angular/core";
import { LanguageService } from "../services/language.service";

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false
})
export class TranslatePipe implements PipeTransform {

    constructor(public languageService: LanguageService) {

    }
    transform(value: any) {
        const translation = this.languageService.getTranslation()
        const keys = value.split('.')
        let translationData = structuredClone(translation)
        keys.forEach((key: string) => {
            translationData = translationData[key]
        });

        return translationData

    }
}
