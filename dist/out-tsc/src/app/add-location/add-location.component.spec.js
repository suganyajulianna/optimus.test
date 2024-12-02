import { TestBed } from '@angular/core/testing';
import { AddLocationComponent } from './add-location.component';
describe('AddLocationComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddLocationComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(AddLocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-location.component.spec.js.map