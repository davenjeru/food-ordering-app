import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

export interface Meal {
  id: string,
  name: string,
  description: string,
  price: number,
}

const AvailableMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState<string>(null as unknown as string)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-76101-default-rtdb.firebaseio.com/meals.json')

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      const loadedMeals: Meal[] = []

      for (const key in data) {
        loadedMeals.push({...data[key] as Meal, id: key})
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((error: any) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Meals Loading</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes['meals-error']}>
        <p>{httpError}</p>
      </section>
    )
  }


  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} {...meal}/>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
