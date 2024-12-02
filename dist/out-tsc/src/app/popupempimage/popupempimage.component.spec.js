import { TestBed } from '@angular/core/testing';
import { PopupempimageComponent } from './popupempimage.component';
describe('PopupempimageComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopupempimageComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(PopupempimageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=popupempimage.component.spec.js.map