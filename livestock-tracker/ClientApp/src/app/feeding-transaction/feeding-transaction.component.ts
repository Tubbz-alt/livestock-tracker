import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { MatSelect } from '@angular/material';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Livestock } from '@livestock/livestock.model';
import { FeedType } from '@feed-type/feed-type.model';
import { Unit } from '@unit/unit.model';
import { FeedingTransaction } from './feeding-transaction.model';
import { LsGridComponent } from '@shared/ls-grid/ls-grid.component';
import { FeedingTransactionService } from './feeding-transaction.service';
import { FeedTypeService } from '@feed-type/feed-type.service';
import { UnitService } from '@unit/unit.service';
import { LsGridConfig } from '@shared/ls-grid/ls-grid-config.model';
import { LsGridColumnDef } from '@shared/ls-grid/ls-grid-column-def.model';
import { LsGridColumnType } from '@shared/ls-grid/ls-grid-column-type.enum';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-feeding-transaction',
  templateUrl: './feeding-transaction.component.html',
  styleUrls: ['./feeding-transaction.component.scss']
})
export class FeedingTransactionComponent implements OnInit, OnDestroy {
  private showDetailTriggered: Subscription;
  private feedTypesChanged: Subscription;
  private unitTypesChanged: Subscription;

  private animals: Livestock[];
  private feedTypes: FeedType[];
  private unitTypes: Unit[];

  @Input() public currentAnimal: Livestock;
  @Input() public feedingTransactions: FeedingTransaction[];
  @Output() public addTransaction = new EventEmitter<number>();
  @Output() public showDetail = new EventEmitter<FeedingTransaction>();

  @ViewChild('data') dataGrid: LsGridComponent;
  @ViewChild('animalSelector') animalSelector: MatSelect;

  constructor(
    private feedingTransactionService: FeedingTransactionService,
    private feedTypeService: FeedTypeService,
    private unitService: UnitService
  ) {
    this.showDetailTriggered = new Subscription();
    this.feedTypesChanged = new Subscription();
    this.unitTypesChanged = new Subscription();

    this.feedingTransactions = [];
    this.feedTypes = [];
    this.unitTypes = [];
  }

  public ngOnInit(): void {
    this.init();
  }

  public getConfig(): LsGridConfig {
    const config = new LsGridConfig();
    config.dataService = this.feedingTransactionService;
    config.columnDef = this.getGridColumnDefs();
    config.useHeading = false;
    config.fetchKey = this.currentAnimal ? this.currentAnimal.id : 0;
    config.routerLink = ['edit'];
    config.queryParameters = (item: FeedingTransaction) => ({ id: item.id });
    this.showDetailTriggered = config.showDetail.subscribe((item: any) => {
      this.showDetail.emit(<FeedingTransaction>item);
    });
    return config;
  }

  public getAnimals(): Livestock[] {
    return this.animals;
  }

  public getCurrentAnimal(): Livestock {
    return this.currentAnimal;
  }

  public add(): void {
    this.addTransaction.emit(this.currentAnimal.id);
  }

  public delete(feedingTransaction: FeedingTransaction) {
    this.feedingTransactionService
      .delete(feedingTransaction)
      .subscribe(() => this.dataGrid.reload());
  }

  private init() {
    this.fetchFeedTypes();
    this.fetchUnitTypes();
  }

  private fetchFeedTypes() {
    this.feedTypeService.getFeedTypes();
    this.feedTypesChanged = this.feedTypeService.feedTypesChanged.subscribe(
      (feedTypes: FeedType[]) => {
        this.feedTypes = feedTypes.slice();
      }
    );
  }

  private fetchUnitTypes() {
    this.unitService.getUnits();
    this.unitTypesChanged = this.unitService.unitsChanged.subscribe(
      (units: Unit[]) => {
        this.unitTypes = units.slice();
      }
    );
  }

  private getGridColumnDefs(): LsGridColumnDef[] {
    const columnDefs = [];

    const colDef2 = new LsGridColumnDef();
    colDef2.description = 'Feed';
    colDef2.field = 'feedID';
    colDef2.pipe = (item: any): string => {
      return this.getFeedTypePipe(item);
    };
    columnDefs.push(colDef2);

    const colDef3 = new LsGridColumnDef();
    colDef3.description = 'Date';
    colDef3.field = 'transactionDate';
    colDef3.pipe = (item: any): string => {
      return this.getDatePipe(item);
    };
    columnDefs.push(colDef3);

    const colDef4 = new LsGridColumnDef();
    colDef4.description = 'Quantity';
    colDef4.field = 'quantity';
    colDef4.width = 70;
    columnDefs.push(colDef4);

    const colDef5 = new LsGridColumnDef();
    colDef5.description = 'Unit';
    colDef5.field = 'unitTypeCode';
    colDef5.pipe = (item: any): string => {
      return this.getUnitPipe(item);
    };
    colDef5.width = 50;
    columnDefs.push(colDef5);

    const colDef6 = new LsGridColumnDef();
    colDef6.description = '';
    colDef6.field = 'delete';
    colDef6.width = 25;
    colDef6.type = LsGridColumnType.Delete;
    colDef6.delete = (event: Event, item: FeedingTransaction) => {
      event.stopPropagation();
      event.preventDefault();
      this.delete(item);
    };
    columnDefs.push(colDef6);

    return columnDefs;
  }

  private getDatePipe(item: string): string {
    const date = moment(item);
    return formatDate(item, 'medium', date.locale(), date.zoneName());
  }

  private getFeedTypePipe(id: number): string {
    if (isNullOrUndefined(this.feedTypes)) {
      this.feedTypes = [];
    }

    const foundType = this.feedTypes.find(feedType => feedType.id === id);
    if (isNullOrUndefined(foundType)) {
      return '';
    }

    return foundType.description;
  }

  private getUnitPipe(id: number): string {
    if (isNullOrUndefined(this.unitTypes)) {
      this.unitTypes = [];
    }

    const foundType = this.unitTypes.find(unit => unit.typeCode === id);
    if (isNullOrUndefined(foundType)) {
      return '';
    }

    return foundType.description;
  }

  public ngOnDestroy(): void {
    this.showDetailTriggered.unsubscribe();
    this.feedTypesChanged.unsubscribe();
    this.unitTypesChanged.unsubscribe();
  }
}
