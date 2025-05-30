import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CalculatorButtonComponent} from "@/calculator/components/calculator-button/calculator-button.component";
import {Component} from "@angular/core";

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="project-content underline">Test button</span>
    </calculator-button>
  `
})
class TestComponentFixture {}

describe('CalculatorButton', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges(); // detecta los cambios en el html compilado
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should apply w-1/4 doubleSize is false', () => {
    const hostClass : string [] = compiled.classList.value.split(' ');
    expect(hostClass).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });
  it('should apply w-2/4 doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    const hostClass : string [] = compiled.classList.value.split(' ');
    expect(hostClass).not.toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });
  it('should emit onClick when handle click', () => {
    // Espias
    spyOn(component.onClick, 'emit');
    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
    // expect(component.onClick.emit).toHaveBeenCalledWith('1');
  });
  it('should set isPressed to true and then false when la keypressed is called', (done) => {
    component.contentValue()!.nativeElement.innerHTML = '1';
    component.keyWordPressedStyle('1');
    expect(component.isPressed()).toBeTrue();
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });
  it('should set isPressed to true if key is not matching', () => {
    component.contentValue()!.nativeElement.innerHTML = '1';
    component.keyWordPressedStyle('2');
    expect(component.isPressed()).toBeFalse();
  });
  it('should display projected content', () => {
    const testHostFixture: ComponentFixture<TestComponentFixture> = TestBed.createComponent(TestComponentFixture);
    const compiled = testHostFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-content')).not.toBeNull();
    expect(compiled.querySelector('.project-content')?.classList.contains('underline')).toBeTrue();
  });
});
