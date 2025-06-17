import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { Observable, Subscription } from 'rxjs';
import { IInfo } from '../../interfaces/iinfo';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-info',
    imports: [
        CommonModule
    ],
    templateUrl: './info.component.html',
    styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit, OnDestroy{

  public info: IInfo = {itemCount: 0, listCount: 0, popularItems: [], popularLists: []};
  public subscription: Subscription = new Subscription();

  constructor(private readonly infoService: InfoService)
  {

  }

  public ngOnInit(): void {
    this.subscription.add(this.infoService.getInfo()
      .subscribe({
        next: (data) => {
          this.info = data;
        }
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
