import { Component, OnInit, WritableSignal, afterNextRender, signal } from "@angular/core";
import { CardTasksComponent } from "../../core/components/cards/card-tasks/card-tasks.component";
import { ModalAddTaskComponent } from "../../core/components/modals/modal-add-task/modal-add-task.component";
import { ITask } from "../../core/interfaces/task.interface";
import { TaskService } from "../../core/services/task.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-settings",
  templateUrl: "./tasks.component.html",
  standalone: true,
  imports: [CardTasksComponent, ModalAddTaskComponent]
})
export class TasksComponent implements OnInit {
  public showModalAdd = new BehaviorSubject(false);
  public allTasks: WritableSignal<Array<ITask>>;
  public taskToEdit?: ITask;

  constructor(private _service: TaskService) {
    this.allTasks = signal([]);
    afterNextRender(() => this._updateAllTasks());
  }

  public ngOnInit(): void {
    this._updateAllTasks();
  }

  public saveTask(task: ITask): void {
    this._service.addTask(task);
    this._updateAllTasks();
  }

  public toogleShowModalAdd() {
    if (this.showModalAdd.getValue()) this.taskToEdit = undefined;
    setTimeout(() => this.showModalAdd.next(!this.showModalAdd.getValue()), 100);
  }

  public editTask(task: ITask): void {
    this.taskToEdit = task;
    this.toogleShowModalAdd();
  }

  public removeTask(number: string): void {
    const isConfirmed = confirm(`Confirma remoção da task ${number}?`)
    if (isConfirmed) {
      this._service.removeTaskByNumber(number);
    }
  }

  private _updateAllTasks(): void {
    this.allTasks.set(this._service.getAllTasks());
  }
}
