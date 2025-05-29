import {ComponentFixture, TestBed} from "@angular/core/testing";
import CalculatorViewComponent from "@/calculator/views/calculator-view/calculator-view.component";

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });
  it('should classes css', () => {
    const divElement = compiled.querySelector('div');
    const divListClasses = divElement?.classList.value.split(' ');

    const shouldHaveClass = 'w-screen mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
    shouldHaveClass.forEach((className) => {
      expect(compiled?.classList.contains(className));
    })
  });
})
