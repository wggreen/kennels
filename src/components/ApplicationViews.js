import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./location/LocationProvider"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import LocationList from "./location/LocationList"
import LocationDetail from "./location/LocationDetail"
import AnimalList from "./animal/AnimalList"
import AnimalForm from "./animal/AnimalForm"
import AnimalDetail from "./animal/AnimalDetail"
import CustomerList from "./customer/CustomerList"
import EmployeeList from "./employee/EmployeeList"
import EmployeeForm from "./employee/EmployeeForm"
import Login from "./auth/Login"

export default (props) => {
    return (
        <>
            <LocationProvider>
                {/* Render the location list when http://localhost:3000/ */}
                <Route exact path="/locations" render={
                    props => {
                        if (localStorage.getItem("kennel_customer") !== null) {
                            return <LocationList {...props} />
                        }
                        return <Login {...props} />
                    }
                } />
                <Route path="/locations/:locationId(\d+)" render={
                    props => <LocationDetail {...props} />
                } />
            </LocationProvider>

            <AnimalProvider>
                <LocationProvider>
                    <CustomerProvider>
                        {/* Render the animal list when http://localhost:3000/animals */}
                        <Route exact path="/animals" render={
                            props => {
                                if (localStorage.getItem("kennel_customer") !== null) {
                                    return <AnimalList {...props} />
                                }
                                return <Login {...props} />
                            }
                        } />

                        <Route exact path="/animals/create" render={
                            props => <AnimalForm {...props} />
                        } />

                        <Route path="/animals/:animalId(\d+)" render={
                            props => <AnimalDetail {...props} />
                        } />
                        <Route path="/animals/edit/:animalId(\d+)" render={
                            props => <AnimalForm {...props} />
                        } />
                    </CustomerProvider>
                </LocationProvider>
            </AnimalProvider>
         
            <CustomerProvider>
                {/* Render the customer list when http://localhost:3000/animals */}
                <Route exact path="/customers" render={
                    props => {
                        if (localStorage.getItem("kennel_customer") !== null) {
                            return <CustomerList {...props} />
                        }
                        return <Login {...props} />
                    }
                } />
            </CustomerProvider>

            <EmployeeProvider>
                <LocationProvider>
                    <Route exact path="/employees" render={
                        props => {
                            if (localStorage.getItem("kennel_customer") !== null) {
                                return <EmployeeList {...props} />
                            }
                            return <Login {...props} />
                        }
                    } />

                    <Route exact path="/employees/create" render={
                        props => <EmployeeForm {...props} />
                    } />
                </LocationProvider>
            </EmployeeProvider>
        </>
    )
}