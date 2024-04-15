import { Component, OnInit, WritableSignal, afterNextRender, signal } from "@angular/core";
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
  public allTasks: WritableSignal<Array<ITask>> = signal([]);

  constructor(private _taskService: TaskService) {
    afterNextRender(() => this._updateAllTasks());
  }

  ngOnInit() {
    this._updateAllTasks();
  }

  private _updateAllTasks(): void {
    this.allTasks.set(this._taskService.getAllTasks());
  }
}
