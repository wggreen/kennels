


export default (props) => {
    const { employees } = useContext(EmployeeContext)

    return (
        <div className="employees">
            <h1>Employees</h1>
            <button className="addEmployee" onClick={() => props.history.push("/employees/create")}>
                Add Employee
            </button>
            <article className="employeeList">
                {employees.map(employee => <Employee key={employee.id} employee={employee} props={props} />)}
            </article>
        </div>
    )
}