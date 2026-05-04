import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[nz-button]',
})
export class NoFocusDirective {
  @HostListener('mousedown', ['$event'])
  preventFocus(event: MouseEvent): void {
    event.preventDefault();
  }
}
