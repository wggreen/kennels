import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import AnimalForm from "./AnimalForm"
import Animal from "./Animal"
import "./Animals.css"

export default (props) => {
    const { animals } = useContext(AnimalContext)
    
    const existingUserCheck = () => {
        if (localStorage.getItem("kennel_customer") !== null) {
            return true
        }
        else {
            return false
        }
    }

    return (
        <div className="animals">
            <button onClick={() => {
                if (existingUserCheck() === true) {
                    props.history.push("/animals/create")
                } else {
                    props.history.push("/")
                }
            }}>
                Make Appointment 
            </button>
            {
                animals.map(animal => {

                    return <Animal key={animal.id}
                            animal={animal} />
            })}
        </div>
    )
}