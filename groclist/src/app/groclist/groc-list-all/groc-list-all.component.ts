import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { GroceryListService } from '../../services/grocery-list.service';
import { IGroceryList } from '../../interfaces/igrocery-list';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-groc-list-all',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  templateUrl: './groc-list-all.component.html',
  styleUrl: './groc-list-all.component.css'
})
export class GrocListAllComponent implements OnInit {


  public displayedColumns: string[] = ['id', 'name', 'createdDate', 'isComplete', 'items']
  public dataSource: MatTableDataSource<IGroceryList>;
  @ViewChild(MatPaginator, {static: true})paginator: MatPaginator;
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
