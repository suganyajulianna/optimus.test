import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let ImageModalComponent = class ImageModalComponent {
    dialogRef;
    data;
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    onNoClick() {
        this.dialogRef.close();
    }
};
ImageModalComponent = __decorate([
    Component({
        selector: 'app-image-modal',
        templateUrl: './image-modal.component.html',
        styleUrls: ['./image-modal.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], ImageModalComponent);
export { ImageModalComponent };
//# sourceMappingURL=image-modal.component.js.map