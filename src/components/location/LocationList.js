import React, { useContext } from "react"
import { LocationContext } from "./LocationProvider"
import Location from "./Location"
import "./Locations.css"

export default () => {
    const { locations } = useContext(LocationContext)

    return (
        <div className="locations">
        {
            locations.map(loc => {
                return <Location key={loc.id} 
                        location={loc} />
            })
        }
        </div>
    )
}