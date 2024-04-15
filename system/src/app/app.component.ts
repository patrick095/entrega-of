import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './core/services/task.service';
import { StorageUtil } from './core/utils/storage.util';
import { RequestCache } from './core/utils/request-cache.util';
import { SessionUtil } from './core/utils/session.util';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [TaskService, StorageUtil, SessionUtil, RequestCache, ConfigService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'entrega-of';
}
