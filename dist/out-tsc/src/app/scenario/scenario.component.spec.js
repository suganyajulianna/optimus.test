import { TestBed } from '@angular/core/testing';
import { ScenarioComponent } from './scenario.component';
describe('ScenarioComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ScenarioComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ScenarioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=scenario.component.spec.js.map