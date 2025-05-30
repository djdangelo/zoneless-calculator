import {CalculatorComponent} from "@/calculator/components/calculator/calculator.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CalculatorService} from "@/calculator/services/calculator.service";

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');
  public constructNumber = jasmine.createSpy('constructNumber');
}


describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
    //fixture.detectChanges();
  });
  it('should created component', () => {
    expect(component).toBeTruthy();
  });
  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });
  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('54');
    mockCalculatorService.lastOperator.and.returnValue('*');
    fixture.detectChanges();
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('54');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator buttons', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator buttons with projects', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('C'); // evaluando el contenido del boton en base a la posision.
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', {
      key: 'Enter',
    });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('='); // con estos eventos evaluamos las keys presionadas
  });
  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    fixture.detectChanges();
    expect(component.resultText()).toBe('123');
  });
});
