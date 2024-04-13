import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITask } from "../../../interfaces/task.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
  standalone: true,
  imports: [CommonModule]
})
export class CardTableComponent implements OnInit {
  @Input() public tasks: Array<ITask> = [];
  @Input() public isTaskManager = false;
  @Output() public editTask = new EventEmitter<ITask>();
  @Output() public removeTask = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  public edit(task: ITask): void {
    this.editTask.emit(task);
  }

  public removeByNumber(number: string): void {
    this.removeTask.emit(number);
  }
}
