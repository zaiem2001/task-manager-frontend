import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map } from 'rxjs';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  template: `
    <div class="" *ngIf="!taskItems.length">No Tasks</div>
    <div *ngIf="taskItems.length">
      <div
        *ngFor="let taskItem of taskItems"
        [ngClass]="{
          'task-item': true,
          'is-complete': taskItem.completed
        }"
      >
        <span (click)="onTaskComplete(taskItem)">{{
          taskItem.description
        }}</span>

        <div class="task-actions">
          <button mat-raised-button>
            <mat-icon aria-label="edit icon" class="edit-icon">edit</mat-icon>
          </button>
          <button (click)="onTaskDelete(taskItem._id)" type="button">
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
export class TaskItemComponent implements OnInit, OnChanges {
  taskItems: Task[] = [];
  taskSubject = new Subject<Task[]>();
  @Input('createdTask') createdTask: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getTasks();

    this.taskSubject.subscribe((response) => {
      this.taskItems = response;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { createdTask } = changes;
    if (createdTask.currentValue) {
      this.taskSubject.next([...this.taskItems, createdTask.currentValue]);
    }
  }

  private getTasks() {
    this.route.params.subscribe((params) => {
      const { listId } = params;

      if (listId) {
        this.taskService.getListTasks(listId).subscribe((response) => {
          const { task } = response;
          this.taskSubject.next(task);
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

  onTaskDelete(taskId: string) {
    this.taskService
      .deleteTask(taskId)
      .pipe(
        map((response) => {
          const { task } = response;

          const filteredTasks = this.taskItems.filter(
            (item) => item._id !== task._id
          );
          return filteredTasks;
        })
      )
      .subscribe((taskData) => {
        this.taskItems = taskData;
      });
  }
}
