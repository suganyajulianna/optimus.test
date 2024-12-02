import { TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
describe('MainComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MainComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=main.component.spec.js.map