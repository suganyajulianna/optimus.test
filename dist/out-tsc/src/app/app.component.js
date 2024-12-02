import { __decorate, __param } from "tslib";
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MainComponent } from './main/main.component';
import { isPlatformBrowser } from '@angular/common';
let AppComponent = class AppComponent {
    platformId;
    title(title) {
        throw new Error('Method not implemented.');
    }
    isLeftSidebarCollapsed = signal(false);
    screenWidth = signal(0); // Initialize with 0
    constructor(platformId) {
        this.platformId = platformId;
        // Check if we are in the browser and set the initial screenWidth
        if (isPlatformBrowser(this.platformId)) {
            this.screenWidth.set(window.innerWidth);
        }
    }
    onResize() {
        // Check if we are in the browser before accessing window
        if (isPlatformBrowser(this.platformId)) {
            this.screenWidth.set(window.innerWidth);
            if (this.screenWidth() < 768) {
                this.isLeftSidebarCollapsed.set(true);
            }
            else {
                this.isLeftSidebarCollapsed.set(false);
            }
        }
    }
    ngOnInit() {
        // Only set collapsed state if in browser
        if (isPlatformBrowser(this.platformId)) {
            this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
        }
    }
    changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed) {
        this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
    }
};
__decorate([
    HostListener('window:resize')
], AppComponent.prototype, "onResize", null);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [LeftSidebarComponent, MainComponent],
        providers: [],
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    }),
    __param(0, Inject(PLATFORM_ID))
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map