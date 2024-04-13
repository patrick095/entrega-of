import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CardTableComponent } from "../card-table/card-table.component";
import { ITask } from "../../../interfaces/task.interface";

@Component({
  selector: "app-card-tasks",
  templateUrl: "./card-tasks.component.html",
  standalone: true,
  imports: [CommonModule, CardTableComponent]
})
export class CardTasksComponent implements OnInit {
  @Input() public tasks: Array<ITask> = [];
  @Output() public showModalAdd = new EventEmitter<boolean>();
  @Output() public editTask = new EventEmitter<ITask>();
  @Output() public removeTask = new EventEmitter<string>();
  
  public showToken: boolean;

  constructor() {
    this.showToken = false;
  }

  ngOnInit(): void {}
}
