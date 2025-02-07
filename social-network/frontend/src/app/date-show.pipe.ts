import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateShow',
  standalone: false,
})
export class DateShowPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let publishDate = new Date(value);
    let date =
      publishDate.getDay() +
      '.' +
      (publishDate.getMonth() + 1) +
      '.' +
      publishDate.getFullYear();
    return date;
  }
}
