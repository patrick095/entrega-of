import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './core/services/task.service';
import { StorageUtil } from './core/utils/storage.util';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [TaskService, StorageUtil],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'entrega-of';
}
