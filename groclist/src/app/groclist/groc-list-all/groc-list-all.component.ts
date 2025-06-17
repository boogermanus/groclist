import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { GroceryListService } from '../../services/grocery-list.service';
import { IGroceryList } from '../../interfaces/igrocery-list';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
    selector: 'app-groc-list-all',
    imports: [
        MatTableModule,
        CommonModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatListModule
    ],
    templateUrl: './groc-list-all.component.html',
    styleUrl: './groc-list-all.component.css',
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class GrocListAllComponent implements OnInit {


  public displayedColumns: string[] = [
    'id', 
    'name', 
    'createdDate', 
    'items', 
    'isComplete',
    'expand'
  ]

  public dataSource: MatTableDataSource<IGroceryList>;
  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;
  public expandedElement: IGroceryList | null;

  constructor(
    private readonly grocListService: GroceryListService
  )
  {}

  ngOnInit(): void {
    this.grocListService.getAllListsForUser().subscribe(
      {
        next: (data) => {
          this.dataSource = new MatTableDataSource<IGroceryList>(data);
          this.dataSource.paginator = this.paginator;
        }
      }
    )
  }

}
