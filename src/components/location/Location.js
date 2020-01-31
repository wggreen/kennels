import React from "react"
import { Link } from "react-router-dom"
import "./Locations.css"

export default ({ location }) => (
    <section className="location">
        <h3 className="location__name">
            <Link to={`/locations/${location.id}`}>
                    { location.name }
            </Link>
        </h3>
        <div className="location__animals">{location.animals.length} animals</div>
        <div className="location__employees">{location.employees.length} employees</div>
    </section>
)   