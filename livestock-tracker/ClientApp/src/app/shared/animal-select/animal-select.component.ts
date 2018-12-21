import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Livestock } from '@livestock/livestock.model';
import { LivestockService } from '@livestock/livestock.service';

@Component({
  selector: 'app-animal-select',
  templateUrl: './animal-select.component.html',
  styleUrls: ['./animal-select.component.scss']
})
export class AnimalSelectComponent implements OnInit, OnChanges {
  @Input() public animal: Livestock;
  @Input() public animals: Livestock[];
  @Output() public animalChanged = new EventEmitter<number>();

  public currentAnimal: Livestock;

  constructor(private livestockService: LivestockService) {}

  public ngOnInit() {
    this.updateAnimal();
  }

  public ngOnChanges() {
    this.updateAnimal();
  }

  public getSvgIcon(animal: Livestock) {
    return this.livestockService.getSvgIcon(animal);
  }

  public onChange($event: MatSelectChange) {
    this.animalChanged.emit($event.value);
  }

  private updateAnimal() {
    this.currentAnimal = this.animal;
  }
}
