import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
let PopupempimageComponent = class PopupempimageComponent {
    data;
    constructor(data) {
        this.data = data;
    }
};
PopupempimageComponent = __decorate([
    Component({
        selector: 'app-popupempimage',
        standalone: true,
        imports: [MatDialogModule],
        templateUrl: './popupempimage.component.html',
        styleUrl: './popupempimage.component.css'
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], PopupempimageComponent);
export { PopupempimageComponent };
//# sourceMappingURL=popupempimage.component.js.map