import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
let LeftSidebarComponent = class LeftSidebarComponent {
    isLeftSidebarCollapsed = input.required();
    changeIsLeftSidebarCollapsed = output();
    items = [
        {
            routeLink: 'dashboard',
            icon: 'fas fa-home',
            label: 'Dashboard',
        },
        {
            routeLink: 'products',
            icon: 'fas fa-camera',
            label: 'Camera',
        },
        {
            routeLink: 'scenario',
            icon: 'fas fa-project-diagram',
            label: 'Scenario',
        },
        {
            routeLink: 'pages',
            icon: 'fas fa-file',
            label: 'Report',
        },
        {
            routeLink: 'settings',
            icon: 'fas fa-cog',
            label: 'Settings',
        },
        {
            routeLink: 'login',
            icon: 'fas fa-sign-out',
            label: 'logout',
        },
    ];
    toggleCollapse() {
        this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
    }
    closeSidenav() {
        this.changeIsLeftSidebarCollapsed.emit(true);
    }
};
LeftSidebarComponent = __decorate([
    Component({
        selector: 'app-left-sidebar',
        standalone: true,
        imports: [RouterModule, CommonModule],
        templateUrl: './left-sidebar.component.html',
        styleUrl: './left-sidebar.component.css',
    })
], LeftSidebarComponent);
export { LeftSidebarComponent };
//# sourceMappingURL=left-sidebar.component.js.map