import { Component } from '@angular/core';
import { CarsServiceService } from '../../services/cars-service.service';
import { Car } from '../../interfaces/car';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent {

  
}
