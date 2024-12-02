import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
let DashboardComponent = class DashboardComponent {
    router;
    notifications = [];
    // Inject Router service
    constructor(router) {
        this.router = router;
    }
    // Add notification to the queue
    showNotification(message) {
        this.notifications.push(message);
        // Auto-remove the notification after 3 seconds
        setTimeout(() => {
            this.notifications.shift();
        }, 300000000); // Reduced time for demonstration
    }
    // Manually close notification
    closeNotification(index) {
        this.notifications.splice(index, 1);
    }
    // Trigger notifications
    triggerNotifications() {
        this.showNotification('Hazard Warnings.');
        // Create a notification object (Browser Notification or any custom notification)
        const notification = new Notification('Hazard Warnings.');
        // Define the click event of the notification
        notification.onclick = () => {
            // Navigate to the other page when notification is clicked
            this.router.navigate(['/scenario']); // Replace '/target-route' with your actual route
        };
    }
};
DashboardComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        standalone: true,
        imports: [CommonModule, RouterModule],
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css'],
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map