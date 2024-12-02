import { TestBed } from '@angular/core/testing';
import { ImageModalComponent } from './image-modal.component';
describe('ImageModalComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ImageModalComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ImageModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=image-modal.component.spec.js.map