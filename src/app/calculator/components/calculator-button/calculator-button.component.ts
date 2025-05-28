import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild, } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'this.isDoubleSize()',
    '[class.bg-indigo-700]': 'this.isCommand()',
    '[class.bg-indigo-600]': 'this.isPressed()'
  }
})
export class CalculatorButtonComponent {

  public isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value,
  });
  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value,
  });

  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  // @HostBinding('class.bg-indigo-700') get commandStyle () {
  //   return this.isCommand();
  // }
  // @HostBinding('class.w-2/4') get dooubleSizeStyle () {
  //   return this.isDoubleSize();
  // }


  handleClick() {
    this.onClick.emit(this.getValueContent());
  }


  public keyWordPressedStyle(key: string) {
    if (this.getValueContent() !== key) {
      return;
    }
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100)
  }

  private getValueContent(): string {
    return this.contentValue()!.nativeElement.innerHTML.trim();
  }

}
