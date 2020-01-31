import React, { useContext } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employees.css"


export default ({employee, props}) => {
    const { releaseEmployee } = useContext(EmployeeContext)

    return (
    <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <div className="employee__site">{employee.location.address}</div>
        <div className="employee__manager">{employee.manager ? "Manager" : "Not a manager"}</div>
        <button className="btn--release"
            onClick={() => {
                releaseEmployee(employee.id)
                .then(() => {
                    props.history.push("/employees")
                })
            }}
            >Release
        </button>
    </section>
    )
}