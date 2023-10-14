import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { List } from 'src/app/models/list.model';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-item',
  template: `
    <div
      *ngFor="let listItem of listItems"
      [ngClass]="{
        'is-active': listItem._id === listId,
        'list-item': true
      }"
      (click)="onListClick(listItem._id)"
    >
      <span>{{ listItem.title }}</span>
    </div>
  `,
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnChanges {
  listId: undefined | null | string = null;
  listItems: List[] = [];
  lsSubject = new Subject<List[]>();
  @Input('createdList') createdList: List | null = null;

  constructor(
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { createdList } = changes;
    if (createdList.currentValue) {
      this.lsSubject.next([...this.listItems, createdList.currentValue]);
    }
  }

  ngOnInit(): void {
    this.lsSubject.subscribe((response) => {
      this.listItems = response || [];
    });

    this.listService.getUsersList().subscribe((response) => {
      const { list } = response;
      this.lsSubject.next(list || []);
    });

    this.route.params.subscribe((params) => {
      const { listId } = params;
      this.listId = listId;
    });
  }

  onListClick(_id: string) {
    this.router.navigate([`/${_id}`]);
  }
}
