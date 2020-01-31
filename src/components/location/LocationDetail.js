import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { LocationContext } from "./LocationProvider"
import "./Locations.css"

export default (props) => {
    const { locations } = useContext(LocationContext)

    /*
        This line of code will be explained in the next
        section of the chapter.
    */
    const chosenLocationId = parseInt(props.match.params.locationId, 10)

    const location = locations.find(l => l.id === chosenLocationId) || {}

    return (
        <section className="location">
            <h1 className="location__name">{location.name}</h1>
            <section className="locations__animalsListSection">
                <h2 className="locations__animalsListHeader">Currently caring for </h2>
                <ul className="locations__animalsList">
                {
                    location.animals.map(animal => 
                    <li key={animal.id}>
                        <Link to={`/animals/${animal.id}`}>
                            { animal.name }
                        </Link>
                    </li>)
                }
                </ul>
            </section>
            <h4>We currently have {location.employees.length} well-trained animal lovers and trainers:</h4>
            <ul className="locations__employeesList">
            {
                location.employees.map(animal => <li key={animal.id}>{animal.name}</li>)
            }
            </ul>
        </section>
    )

}