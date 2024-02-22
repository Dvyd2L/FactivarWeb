import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit, OnChanges {
  @ViewChild('toast', { static: false })
  public toast!: ElementRef<HTMLDialogElement>;
  @Input({ alias: 'toast-props', required: true }) public props = {
    title: '',
    message: '',
    type: '',
    life: 3000,
  };
  @Input() public show: boolean = false;

  ngOnInit(): void {
    // this.toast.nativeElement.style.setProperty(
    //   '--toast-life',
    //   `${this.props.life}ms`
    // );
    setTimeout(() => (this.show = false), this.props.life);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show']) {
      this.show ? this.open() : this.close();
    }
  }

  public open() {
    if (this.toast) {
      this.toast.nativeElement.show();
    }
  }

  public close() {
    this.show = false;
  }

  public setIcon() {
    switch (this.props.type) {
      case 'success':
        return 'assets/images/svg/check-square-fill.svg';
      case 'warn':
        return 'assets/images/svg/exclamation-triangle-fill.svg';
      case 'error':
        return 'assets/images/svg/exclamation-octagon-fill.svg';
      case 'info':
        return 'assets/images/svg/info-circle-fill.svg';
      default:
        return '';
    }
  }
}
