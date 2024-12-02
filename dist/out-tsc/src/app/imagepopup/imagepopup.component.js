import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
let ImagepopupComponent = class ImagepopupComponent {
    data;
    dialogRef;
    imageUrl = null;
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.imageUrl = data?.imageUrl || null;
    }
    close() {
        this.dialogRef.close();
    }
};
ImagepopupComponent = __decorate([
    Component({
        selector: 'app-imagepopup',
        standalone: true,
        imports: [MatDialogModule],
        templateUrl: './imagepopup.component.html',
        styleUrl: './imagepopup.component.css'
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ImagepopupComponent);
export { ImagepopupComponent };
//# sourceMappingURL=imagepopup.component.js.map