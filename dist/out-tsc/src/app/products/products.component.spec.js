import { TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
describe('ProductsComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductsComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=products.component.spec.js.map