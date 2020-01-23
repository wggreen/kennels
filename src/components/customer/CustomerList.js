import React, { useContext } from "react"
import { CustomerContext } from "./CustomerProvider"
import Customer from "./Customer"
import "./Customers.css"

export default () => {
    const { customers } = useContext(CustomerContext)

    return (
        <div className="customers">
            {
                customers.map(cus => <Customer key={cus.id} customer={cus} />)
            }
        </div>
    )
}