import { Injectable } from '@angular/core';
import { StorageUtil } from '../utils/storage.util';
import { ITask } from '../interfaces/task.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _allTasks: BehaviorSubject<Array<ITask>>;
  private _taskStorageId = '_TASKS';

  constructor(private _storage: StorageUtil) {
    this._allTasks = new BehaviorSubject<Array<ITask>>(this._storage.get(this._taskStorageId) ?? []);
  }

  public getAllTasks(): Array<ITask> {
    return this._allTasks.getValue();
  }

  public watchTasks(): BehaviorSubject<Array<ITask>> {
    return this._allTasks;
  }

  public addTask(task: ITask): void {
    this._allTasks.next([...this._allTasks.getValue(), task]);
    this._storage.store(this._taskStorageId, this._allTasks.getValue());
  }

  public removeTaskByNumber(number: string): void {
    const allTasks = this._allTasks.getValue();
    const index = allTasks.findIndex((task) => task.number === number);
    allTasks.splice(index, 1);
    this._allTasks.next(allTasks);
    this._storage.store(this._taskStorageId, this._allTasks.getValue());
  }
}
