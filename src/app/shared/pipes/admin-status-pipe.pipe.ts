import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'adminStatus',
  pure: true
})
export class AdminStatusPipe implements PipeTransform {

  transform(email: string, admins: string[]): any {
    return admins.includes(email);
  }

}
