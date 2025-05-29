import {CalculatorService} from "@/calculator/services/calculator.service";
import {TestBed} from "@angular/core/testing";

describe('CalculatorService', () => {
  let services: CalculatorService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    services = TestBed.inject(CalculatorService);
  });
  it('should be created service', () => {
    expect(services).toBeTruthy();
  });
  it('should return the correct value', () => {
    expect(services.resultText()).toBe('0');
    expect(services.subResultText()).toBe('0');
    expect(services.lastOperator()).toBe('+');
  });
  it('should set resultText to "0" whe is pressed "C"', () => {
    services.resultText.set('123');
    services.subResultText.set('123');
    services.lastOperator.set('-');
    services.constructNumber('C');
    expect(services.resultText()).toBe('0');
    expect(services.subResultText()).toBe('0');
    expect(services.lastOperator()).toBe('+');
  });
  it('should update resultText with number input', () => {
    services.resultText.set('1');
    expect(services.resultText()).toBe('1');
    services.resultText.set('2');
    expect(services.resultText()).toBe('2');
  });
  it('should handle operator correctly', () => {
    services.constructNumber('1');
    services.constructNumber('-');
    expect(services.subResultText()).toBe('1');
    expect(services.lastOperator()).toBe('-');
    expect(services.resultText()).toBe('0');
  });
  it('should calculate result correctly for addition', () => {
    services.constructNumber('1');
    services.constructNumber('+');
    services.constructNumber('1');
    services.constructNumber('=');
    expect(services.resultText()).toBe('2');
  });
  it('should calculate result correctly for subtraction', () => {
    services.constructNumber('1');
    services.constructNumber('-');
    services.constructNumber('1');
    services.constructNumber('=');
    expect(services.resultText()).toBe('0');
  });
  it('should calculate result correctly for divided', () => {
    services.constructNumber('1');
    services.constructNumber('/');
    services.constructNumber('1');
    services.constructNumber('=');
    expect(services.resultText()).toBe('1');
  });
  it('should calculate result correctly for mult', () => {
    services.constructNumber('1');
    services.constructNumber('0');
    services.constructNumber('*');
    services.constructNumber('5');
    services.constructNumber('=');
    expect(services.resultText()).toBe('50');
  });
  it('should handle decimal point correctly', () => {
    services.constructNumber('1');
    services.constructNumber('.');
    services.constructNumber('5');
    expect(services.resultText()).toBe('1.5');
  });
  it('should handle sign change correctly', () => {
    services.constructNumber('1');
    services.constructNumber('+/-');
    expect(services.resultText()).toBe('-1');
    services.constructNumber('-1');
    services.constructNumber('+/-');
    expect(services.resultText()).toBe('1');
  });
  // it('should backspace correctly', () => {
  //   services.resultText.set('123');
  //   services.constructNumber('Backspace');
  //   expect(services.resultText()).toBe('12');
  //   services.constructNumber('Backspace');
  //   expect(services.resultText()).toBe('1');
  //   services.constructNumber('Backspace');
  //   expect(services.resultText()).toBe('0');
  // });
  it('should handle mac length', () => {
    for (let i = 0; i < 10; i++) {
      services.constructNumber('1');
    }
    services.constructNumber('1');
    expect(services.resultText().length).toBe(10);
  });
  // it('should handle decimal point correctly stating zero', () => {
  //   services.constructNumber('0');
  //   services.constructNumber('.');
  //   services.constructNumber('.');
  //   services.constructNumber('.');
  //   services.constructNumber('0');
  //   expect(services.resultText()).toBe('0.0');
  // });
});


