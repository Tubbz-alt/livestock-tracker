import { Component, OnInit, OnDestroy } from '@angular/core';

import { LivestockService } from './../livestock/livestock.service';
import { Livestock } from './../livestock/livestock.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public animals: Livestock[];
  private animalsChangedSubscription: Subscription;

  constructor(private livestockService: LivestockService) {
  }

  ngOnInit() {
    this.animals = this.livestockService.getLivestock();
    this.animalsChangedSubscription = this.livestockService.livestockChanged.subscribe((animals: Livestock[]) =>  {
      this.animals = animals;
    });
  }

  ngOnDestroy() {
    this.animalsChangedSubscription.unsubscribe();
  }
}
