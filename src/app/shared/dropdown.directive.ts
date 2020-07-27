import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
})

export class DropdownDirective {
    @HostBinding('class.open') isOpen = false; // class is an array of all classes. after the dott we say the name of the specific class

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    // To close the dropdown (ALL dropdowns in the document) from enywhere
    // Need to add the $event in the right place of component.html
    // @HostListener('document.click', ['$event']) toggleOpen(event: Event) {
    // this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    // this.isOpen = !this.isOpen;
    // }
    // constructor(private elRef: ElementRef) { }

}