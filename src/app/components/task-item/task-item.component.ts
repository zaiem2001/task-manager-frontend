import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  template: `
    <div class="" *ngIf="!taskItems.length">No Tasks</div>
    <div *ngIf="taskItems.length">
      <div
        *ngFor="let taskItem of taskItems"
        (click)="onTaskComplete(taskItem)"
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
      </div>
    </div>
  `,
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  taskItems: Task[] = [];
  // @Input('task-item') taskItem: string = '';
  // @Input('is-complete') isComplete: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks() {
    this.route.params.subscribe((params) => {
      const { listId } = params;

      if (listId) {
        this.taskService.getListTasks(listId).subscribe((response) => {
          const { task } = response;
          this.taskItems = task;
        });
      }
    });
  }

  onTaskComplete(task: Task) {
    const { _id, completed, description } = task;
    this.taskService
      .updateTask({
        _id,
        completed: !completed,
        description,
      })
      .subscribe((response) => {
        const { task } = response;

        this.taskItems = this.toggleCompleted(task);
      });
  }

  private toggleCompleted(task: Task) {
    return this.taskItems.map((item) => {
      if (item._id === task._id) {
        return {
          ...item,
          completed: task.completed,
        };
      }
      return item;
    });
  }
}
