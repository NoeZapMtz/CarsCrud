import { Component } from '@angular/core';
import { CarsServiceService } from '../../services/cars-service.service';
import { Car } from '../../interfaces/car';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-car',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './new-car.component.html',
  styleUrl: './new-car.component.scss'
})
export class NewCarComponent {

    public actualDate: Date;
    public newCarForm: FormGroup;
    public close: boolean;

  constructor(
    private carsService: CarsServiceService, 
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewCarComponent>){

    this.close= false;
    this.actualDate = new Date();
    //Form validations
    this.newCarForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: [this.actualDate.getFullYear(), [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  submitForm() {
    let errorText: string = '';
    let newCar:Car = this.newCarForm.value; 

    //If everithing is OK then we add the car to the list   
    if (this.newCarForm.valid && (newCar.year>0 && newCar.year<this.actualDate.getFullYear()+2 ) ){
      //Call the service function that adds and updates list
      if (this.carsService.addCar(newCar)){

        //Reset all validations
        this.newCarForm.reset();
        
        const makeControll= this.newCarForm.get('make');
        if(makeControll){
          makeControll.clearValidators();
          makeControll.updateValueAndValidity();
        }
        const modelControll= this.newCarForm.get('model');
        if(modelControll){
          modelControll.clearValidators();
          modelControll.updateValueAndValidity();
        }

        this.newCarForm.reset({make:'', model: '', year: this.actualDate.getFullYear() });

        //Success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Car Added succesfully',
        });
      }
    }else{
      
      //Validations in case the form returns a problem
      let errorText = '';
      if(newCar.year === 0 || 
        newCar.year === null) { errorText = 'A year is needed'; }
      if(newCar.year >= this.actualDate.getFullYear()+2 ) { errorText = 'This year has not started yet'; }
      if(newCar.model === ''){ errorText = 'A model is needed'; }
      if(newCar.make === ''){ errorText = 'A maker is needed'; }
        //Error message
      Swal.fire({
        icon: 'error', 
        title: '¡Error!',
        text: errorText,
        confirmButtonText: 'Cerrar',
      });
    }
  }

  closeDialog(added: boolean){
    //Close dialog when click cancel
     if(this.close){
      this.dialogRef.close(false);
    }else{// Close dialog when some problem
      this.dialogRef.close(false);
      Swal.fire({
        icon: 'error', 
        title: '¡Error!',
        text: 'There was sme problem, try again later',
        confirmButtonText: 'Cerrar',
      });
    }
  }
}
