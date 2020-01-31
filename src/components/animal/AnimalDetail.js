import React, { useContext } from "react"
import { CustomerContext } from "../customer/CustomerProvider"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "./AnimalProvider"
import "./Animals.css"

export default (props) => {
    const { animals, releaseAnimal } = useContext(AnimalContext)
    const { locations } = useContext(LocationContext)
    const { customers } = useContext(CustomerContext)

    /*
        This line of code will be explained in the next
        section of the chapter.
    */
    const chosenAnimalId = parseInt(props.match.params.animalId, 10)

    const animal = animals.find(a => a.id === chosenAnimalId) || {}
    const customer = customers.find(c => c.id === animal.customerId) || {}
    const location = locations.find(l => l.id === animal.locationId) || {}

    return (
        <section className="animal">
            <h3 className="animal__name">{ animal.name }</h3>
            <div className="animal__breed">{ animal.breed }</div>
            <div className="animal__location">Location: { location.name }</div>
            <div className="animal__owner">Customer: { customer.name }</div>
            <div className="animal__treatment">Treatment history: { animal.treatment }</div>
            <button onClick={() => {
                props.history.push(`/animals/edit/${animal.id}`)
                }}>Edit
            </button>
            <button className="btn--release"
                onClick={() => {
                    releaseAnimal(chosenAnimalId)
                        .then(() => {
                            props.history.push("/animals")
                        })
                }}
                >Release
            </button>
        </section>
    )

}