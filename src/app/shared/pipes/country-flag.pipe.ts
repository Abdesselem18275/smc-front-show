import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFlag'
})
export class CountryFlagPipe implements PipeTransform {
  flagUrl = 'https://www.countryflags.io/';
  transform = (alpha2Code: string): string =>
    `${this.flagUrl}${alpha2Code}/flat/64.png`;
}
