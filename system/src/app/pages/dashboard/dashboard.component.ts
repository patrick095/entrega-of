import { Component, OnInit } from "@angular/core";
import { CardTableComponent } from "../../core/components/cards/card-table/card-table.component";
import { ITask } from "../../core/interfaces/task.interface";
import { TaskService } from "../../core/services/task.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  standalone: true,
  imports: [CardTableComponent]
})
export class DashboardComponent implements OnInit {
  public allTasks: Array<ITask> = [];

  constructor(private _taskService: TaskService) {}

  ngOnInit() {
    this.allTasks = this._taskService.getAllTasks();
  }
}
