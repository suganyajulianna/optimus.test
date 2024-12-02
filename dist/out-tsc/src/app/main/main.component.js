import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
let MainComponent = class MainComponent {
    isLeftSidebarCollapsed = input.required();
    screenWidth = input.required();
    sizeClass = computed(() => {
        const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
        if (isLeftSidebarCollapsed) {
            return '';
        }
        return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
    });
};
MainComponent = __decorate([
    Component({
        selector: 'app-main',
        standalone: true,
        imports: [RouterOutlet, CommonModule],
        templateUrl: './main.component.html',
        styleUrl: './main.component.css',
    })
], MainComponent);
export { MainComponent };
//# sourceMappingURL=main.component.js.map