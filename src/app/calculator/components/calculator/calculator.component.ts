import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKewordEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);


  public calculatorButtons = viewChildren(CalculatorButtonComponent);


  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  // get resultText() {
  //   return this.calculatorService.resultText();
  // }


  handleKewordEvent(event: KeyboardEvent) {
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      Backspace: 'C',
      x: '*',
      '÷':'/',
      Enter: '='
    }

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);
    this.calculatorButtons().forEach(button => {
      button.keyWordPressedStyle(keyValue);
    });
  }

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }
}
