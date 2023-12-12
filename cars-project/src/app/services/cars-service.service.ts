import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Service to provide the data and manipulation of the same
//This aim to be the one to connect with the backend
export class CarsServiceService {

  //List of cars
  private carsList = new BehaviorSubject<Car[]>([]);
  //Observable of the list of cars
  lista$ = this.carsList.asObservable();
  

  constructor() {
    //init the cars
    let initList =
    [
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2008
      },
      {
        id: 2,
        make: "BMW",
        model: "340i",
        year: 2018
      },
      {
        id: 3,
        make: "Toyota",
        model: "Tacoma",
        year: 2022
      },
      {
        id: 4,
        make: "Ford",
        model: "Mustang",
        year: 2015
      },
      {
        id: 5,
        make: "Chevrolet",
        model: "Camaro",
        year: 2020
      },
      {
        id: 6,
        make: "Nissan",
        model: "Altima",
        year: 2019
      }
    ]
    //Update subscriptions
    this.carsList.next(initList)
  }

  //Function to add a car an update suscriptions
  public addCar(newCar: Car):boolean{

    let currentList = this.carsList.value;// Take the current list
    newCar.id = currentList.length+1;// Create the unic ID

    let newList = [...currentList, newCar];//Add the item
    this.carsList.next(newList)//Update subscriptions

    return this.validateExistence(newCar.id);
  }

  //Function to validate existence of a car in the list
  validateExistence(id: number): boolean{
    let currentList = this.carsList.value;
    return currentList.some(car => car.id === id) ? true: false;
  }

  //Function to delete a car an update suscriptions
  public deleteCar(id: number): boolean{
    let currentList = this.carsList.value;// Take the current list

    let newList = currentList.filter(car => car.id !== id);//Remove object by id
    this.carsList.next(newList)//Update subscriptions

    return !this.validateExistence(id);
  }
}
