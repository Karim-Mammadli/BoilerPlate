'use client'
import React from "react";
import signUp from "../../../firebase/auth/signup";
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [weight, setWeight] = React.useState('')
    const [height, setHeight] = React.useState('')
    const [age, setAge] = React.useState('')
    const [gender, setGender] = React.useState('')
    
    const router = useRouter()

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (<div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign Up</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="name">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} required type="name" name="name" id="name" placeholder="Name" />
                </label>
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="Email Address" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <label htmlFor="age">
                    <p>Age</p>
                    <input onChange={(e) => setAge(e.target.value)} required type="age" name="age" id="age" placeholder="Age" />
                </label>
                <label htmlFor="weight">
                    <p>Weight</p>
                    <input onChange={(e) => setWeight(e.target.value)} required type="weight" name="weight" id="weight" placeholder="Weight" />
                </label>
                <label htmlFor="height">
                    <p>Height</p>
                    <input onChange={(e) => setHeight(e.target.value)} required type="height" name="height" id="height" placeholder="Height" />
                </label>
                <label htmlFor="gender">
                    <p>Gender</p>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>);
}
