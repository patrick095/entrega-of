import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  afterNextRender,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IDatepickerOptions } from '../../../interfaces/datepicker.interface';
import { ITask } from '../../../interfaces/task.interface';
import { BehaviorSubject } from 'rxjs';
import { DateUtil } from '../../../utils/date.util';
declare var Datepicker: any;

@Component({
  selector: 'app-modal-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add-task.component.html',
})
export class ModalAddTaskComponent implements AfterViewInit, OnInit {
  @Input() public showModal?: BehaviorSubject<boolean>;
  @Input() public taskToEdit?: ITask;
  @Output() public closeModal = new EventEmitter<boolean>();
  @Output() private saveTask = new EventEmitter<ITask>();

  @ViewChild('datePickerStart') dateStart!: ElementRef;
  @ViewChild('datePickerEnd') dateEnd!: ElementRef;

  public isShowModal = false;

  private _datePickerOptions: IDatepickerOptions = {
    format: 'dd/mm/yyyy',
    autohide: true,
    maxDate: new Date(),
    todayHighlight: true,
  };
  private _datepicker?: any;
  private _datePickerInitialized = false;
  private _dateUtil = new DateUtil();

  public form = new FormGroup({
    number: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    dateStart: new FormControl<string>('', [Validators.required]),
    dateEnd: new FormControl<string>('', [Validators.required]),
    project: new FormControl<string>('', [Validators.required]),
    branch: new FormControl<string>('', [Validators.required]),
  });

  constructor() {
    afterNextRender(() => {
      if (Datepicker) {
        this._datepicker = Datepicker;
        this._initDatePicker();
      }
    })
  }

  ngOnInit(): void {
    this.showModal?.subscribe((show) => {
      this.isShowModal = show;
      if (this.taskToEdit && show) {
        this.form.setValue({
          ...this.taskToEdit,
          description: this.taskToEdit.description ?? null,
          dateStart: this._dateUtil.formatDateToStringBR(this.taskToEdit.dateStart),
          dateEnd: this._dateUtil.formatDateToStringBR(this.taskToEdit.dateEnd),
        }, { onlySelf: true });
      } else {
        this.form.reset();
      }
    });
  }

  ngAfterViewInit(): void {
    this._initDatePicker();
  }

  public save(): void {
    const { number, description, dateStart, dateEnd, project, branch } =
      this.form.value;
    if (
      this.form.valid &&
      number &&
      dateStart &&
      dateEnd &&
      project &&
      branch
    ) {
      this.saveTask.emit({
        number,
        description: description ?? '',
        dateStart: this._dateUtil.convertStringBrToDate(dateStart),
        dateEnd: this._dateUtil.convertStringBrToDate(dateEnd),
        project,
        branch,
      });
      this.closeModal.emit(true);
      return;
    }
    alert('Atenção, você deve preencher todos os campos obrigatórios!');
  }

  private _initDatePicker() {
    if (this._datepicker !== undefined && this.dateStart && this.dateEnd && !this._datePickerInitialized) {
      this._datePickerInitialized = true;
      this._initDatePickerElement(this.dateStart.nativeElement);
      this._initDatePickerElement(this.dateEnd.nativeElement);
    }
  }

  private _initDatePickerElement(element: any): void {
    new this._datepicker(element, this._datePickerOptions);
    element.addEventListener('changeDate', (e: any) => {
      const value = e.target.value;
      const formControlName = e.target.getAttribute('formControlName');
      const formControl = this.form.get(formControlName);
      formControl?.setValue(value);
      formControl?.markAsDirty();
    });
  }
}
