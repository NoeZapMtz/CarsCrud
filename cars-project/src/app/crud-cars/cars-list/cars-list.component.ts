import { Component } from '@angular/core';
import { Car } from '../../interfaces/car';
import { CarsServiceService } from '../../services/cars-service.service';
import { CommonModule } from '@angular/common';
import { MatListModule} from '@angular/material/list'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NewCarComponent } from '../new-car/new-car.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    MatTableModule, 
    MatIconModule, 
    MatButtonModule,
    MatDialogModule,  
  ],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent {

  //Data source to susbcribe to observable in service
  dataSource = new MatTableDataSource<Car>(); 

  public columns: string[] = ['make', 'model', 'year', 'actions'];

  constructor(private carsService: CarsServiceService, public dialog: MatDialog){
  }
  
  ngOnInit(){
    //subscription
    this.carsService.lista$.subscribe((carsList) => {
      this.dataSource.data = carsList;
    });
  }

  eliminar(id: number): void{
    if (!this.carsService.deleteCar(id))
    {
      //Message error
      Swal.fire({
        icon: 'error', 
        title: '¡Error!',
        text: 'There was sme problem, try again later',
        confirmButtonText: 'Cerrar',
      });
    }
  }

  agregar(): void{
    //open form new car
    const dialogRef = this.dialog.open(NewCarComponent, {
      width: '300px', // ajusta según tus necesidades
      data: { /* puedes pasar datos al diálogo */ },
    });

    //Message succesfully added
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Car added succesfully',
        });
      }
    });
    
  }
}
