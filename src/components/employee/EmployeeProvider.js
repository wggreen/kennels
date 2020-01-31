import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/

export const EmployeeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const EmployeeProvider = (properties) => {
    const [employees, setEmployees] = useState([])

    const getEmployees = () => {
        return fetch("http://localhost:8088/employees?_expand=location")
            .then(res => res.json())
            .then(setEmployees)
    }

    const addEmployee = employee => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(getEmployees)
    }

    const releaseEmployee = employeeId => {
        return fetch(`http://localhost:8088/employees/${employeeId}`, {
            method: "DELETE"
        })
            .then(getEmployees)
    }

    /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
   useEffect(() => {
       getEmployees()
   }, [])

   useEffect(() => {
    console.log("****  EMPLOYEE APPLICATION STATE CHANGED  ****")
    console.log(employees)
   }, [employees])

   return (
       <EmployeeContext.Provider value={{
           employees, addEmployee, releaseEmployee
       }}>
           {properties.children}
       </EmployeeContext.Provider>
   )
}