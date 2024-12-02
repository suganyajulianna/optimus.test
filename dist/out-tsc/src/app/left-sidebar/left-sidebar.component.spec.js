import { TestBed } from '@angular/core/testing';
import { LeftSidebarComponent } from './left-sidebar.component';
describe('LeftSidebarComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LeftSidebarComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LeftSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=left-sidebar.component.spec.js.map