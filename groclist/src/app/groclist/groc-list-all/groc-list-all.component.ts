import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { GroceryListService } from '../../services/grocery-list.service';
import { IGroceryList } from '../../interfaces/igrocery-list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-groc-list-all',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule
  ],
  templateUrl: './groc-list-all.component.html',
  styleUrl: './groc-list-all.component.css'
})
export class GrocListAllComponent implements OnInit {


  public displayedColumns: string[] = ['id', 'name', 'createdDate', 'isComplete', 'items']
  public dataSource: MatTableDataSource<IGroceryList>;
  constructor(
    private readonly grocListService: GroceryListService
  )
  {}

  ngOnInit(): void {
    this.grocListService.getAllListsForUser().subscribe(
      {
        next: (data) => {
          this.dataSource = new MatTableDataSource<IGroceryList>(data);
        }
      }
    )
  }

}
