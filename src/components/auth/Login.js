import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import "./Login.css"

const Login = props => {
    const email = useRef()
    const password = useRef()
    const customerName = useRef()
    const address = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/customers?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                console.log("exists:")
                console.log(exists)
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("kennel_customer", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if (!exists) {
                    fetch("http://localhost:8088/customers", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            name: customerName.current.value,
                            address: address.current.value
                        })
                    })
                        .then(_ => _.json())
                        .then(response => {
                            localStorage.setItem("kennel_customer", response.id)

                            props.history.push("/locations")
                        })
                }
            })
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <fieldset className="fieldset--login">
                    <label className="label--login" htmlFor="customerName"> Your name </label>
                    <input ref={customerName} type="text"
                        name="customerName"
                        className="form-control"
                        placeholder=""
                        defaultValue="Seamus Flannigan"
                        required autoFocus />
                </fieldset>
                <fieldset className="fieldset--login">
                    <label className="label--login" htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        defaultValue="seamus@gmail.com"
                        required />
                </fieldset>
                <fieldset className="fieldset--login">
                    <label className="label--login" htmlFor="address"> Street Address </label>
                    <input ref={address} type="text"
                        name="address"
                        className="form-control"
                        placeholder="Your address"
                        defaultValue="1000 Universal Court"
                        required />
                </fieldset>
                <fieldset className="fieldset--login">
                    <label className="label--login" htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <button type="submit">
                    Sign in
                </button>
            </form>
        </main>
    )
}

export default Login