// decorator

class Car {
  cost = 100

  constructor() {}
  get_cost = () => this.cost
}

const with_insurance = (object_with_cost) => {
  const cost = object_with_cost.get_cost()
  object_with_cost.get_cost = () => cost * 1.1
}

const car = new Car()
with_insurance(car)
console.log('decorator: ', car.get_cost())
