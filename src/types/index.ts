export interface ISelectedDishes {
  selectedDish: string
  numberOfServings: number
}
export interface IOrderForm {
  mealCategory: string
  numberOfPeople: number
  selectedRestaurant: string
  selectedDishes: ISelectedDishes[]
}
export interface IDishes {
  id: number
  name: string
  restaurant: string
}