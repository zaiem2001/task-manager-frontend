import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { ListService } from 'src/app/services/list.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  listId: string = '';
  createdList: List | null = null;
  createdTask: Task | null = null;

  constructor(
    public dialog: MatDialog,
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.listId = params['listId'];
    });
  }

  openDialog(type: string) {
    const dialogData = this.getDialogData(type);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        ...dialogData,
        payload: '',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.trim()) {
        if (type === 'list') {
          this.newListHandler(data);
        } else {
          this.newTaskHandler(data);
        }
      }
    });
  }

  private newListHandler(title: string) {
    this.listService.createNewList(title).subscribe((response) => {
      const { _id } = response.list;
      this.createdList = response.list;
      this.router.navigate([`${_id}`]);
    });
  }

  private newTaskHandler(description: string) {
    if (this?.listId?.trim()) {
      this.taskService
        .createTask(this.listId, description)
        .subscribe((response) => {
          this.createdTask = response.task;
        });
    }
  }

  private getDialogData(type: string) {
    if (type === 'list') {
      return {
        title: 'Create New List',
      };
    }

    return {
      title: 'Create new Task',
    };
  }

  // TODO
  // updateListDialog(type: string) {
  //   if (type === 'edit') {
  //     this.dialog.open(DialogComponent, {
  //       data: {
  //         title: 'Update List',
  //         payload: '',
  //       },
  //     });
  //   } else {
  //     this.listService.deleteList(this.listId).pipe(
  //       map((response) => {
  //         const { list } = response;
  //       })
  //     );
  //   }
  // }
}
