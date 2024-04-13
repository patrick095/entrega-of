import { Component, OnInit } from '@angular/core';
import { CardStatsComponent } from '../cards/card-stats/card-stats.component';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-header-stats',
  templateUrl: './header-stats.component.html',
  standalone: true,
  imports: [CardStatsComponent],
})
export class HeaderStatsComponent implements OnInit {
  public tasks: Array<ITask> = [];

  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this._taskService.watchTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}
