import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
let AddLocationComponent = class AddLocationComponent {
    fb;
    Location;
    constructor(fb) {
        this.fb = fb;
        // Initialize the Location form group with controls
        this.Location = this.fb.group({
            location: [''],
            location1: ['']
        });
    }
    onSubmit() {
        // Handle form submission logic here
        console.log('Form submitted', this.Location.value);
    }
};
AddLocationComponent = __decorate([
    Component({
        selector: 'app-add-location',
        standalone: true, // Mark component as standalone
        imports: [CommonModule, ReactiveFormsModule], // Import necessary modules directly
        templateUrl: './add-location.component.html',
        styleUrls: ['./add-location.component.css']
    })
], AddLocationComponent);
export { AddLocationComponent };
//# sourceMappingURL=add-location.component.js.map