import { TestBed } from '@angular/core/testing';
import { PpeKitsService } from './ppe-kits.service';
describe('PpeKitsService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PpeKitsService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=ppe-kits.service.spec.js.map