import { useState } from 'react';
import axios from 'axios';

export function Login() {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: user.username,
            password: user.password
        };
        axios
            .post('http://localhost:5000/auth/', newUser)
            .then((response) => {
                window.alert('Logged in!');
            })
            .catch((error) => {
                window.alert('Incorrect Login!');
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}