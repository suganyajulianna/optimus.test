import { TestBed } from '@angular/core/testing';
import { ImagepopupComponent } from './imagepopup.component';
describe('ImagepopupComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImagepopupComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ImagepopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=imagepopup.component.spec.js.map