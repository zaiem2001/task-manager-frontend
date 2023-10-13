import { Component, Input } from '@angular/core';

import { DUMMY_TASKS } from 'src/app/constants/constants';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-item',
  template: `<div
    *ngFor="let taskItem of taskItems"
    [ngClass]="{
      'task-item': true,
      'is-complete': taskItem.completed
    }"
  >
    <span>{{ taskItem.description }}</span>

    <div class="task-actions">
      <button>
        <mat-icon aria-label="edit icon" class="edit-icon">edit</mat-icon>
      </button>
      <button>
        <mat-icon aria-label="delete icon" class="delete-icon"
          >delete_outline</mat-icon
        >
      </button>
    </div>
  </div>`,
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  taskItems: Task[] = DUMMY_TASKS;

  @Input('task-item') taskItem: string = '';
  @Input('is-complete') isComplete: boolean = false;
}
