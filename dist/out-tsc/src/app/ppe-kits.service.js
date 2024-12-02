import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let PpeKitsService = class PpeKitsService {
    http;
    updatePPEKit(kit) {
        throw new Error('Method not implemented.');
    }
    apiUrl = 'http://localhost:4000/api/getppeKits';
    constructor(http) {
        this.http = http;
    }
    getAllPPEKits() {
        return this.http.get(this.apiUrl);
    }
    fire = 'http://localhost:4000/api/fireframes'; // API URL for fetching fire frames
    // Get all fire frames from the backend
    getAllFireFrames() {
        return this.http.get(this.fire);
    }
};
PpeKitsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PpeKitsService);
export { PpeKitsService };
//# sourceMappingURL=ppe-kits.service.js.map