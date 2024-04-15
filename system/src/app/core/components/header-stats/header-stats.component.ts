import { Component, OnInit, WritableSignal, signal } from '@angular/core';
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
  public tasks: WritableSignal<Array<ITask>> = signal([]);
  public points = signal(0);

  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this._taskService.watchTasks().subscribe((tasks) => {
      this.tasks.set(tasks);
      this.points.set(0);
      tasks.forEach((task) => {
        this.points.update((points) => task.points ? points + task.points : points);
      });
    });
  }
}
