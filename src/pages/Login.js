import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login(props) {
    const cookies = props.cookies 
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleLogout = () => {
        console.log('Logging out...!')
        cookies.remove('token');
        
    }

    // Login
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: user.username,
            password: user.password
        };

        axios
            .post('http://localhost:5000/auth/', {user: newUser, cookies: cookies}, )
            .then((response) => {
                console.log('ok', response)
                cookies.set('token', response.data, { 
                    path: '/',
                    maxAge: 3600,
                    SameSite: 'Lax',
                    HttpOnly: true});
                console.log(cookies.get('token') )
                navigate('/');
                window.location.reload();
            })
            .catch((error) => {
                window.alert('Invalid username or password!');
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
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}