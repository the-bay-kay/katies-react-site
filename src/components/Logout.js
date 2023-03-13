import { useNavigate } from 'react-router-dom';

export const Logout = (props) => {
    const navigate = useNavigate();
    const logout = async () => {
        if(window.confirm('Really log out?')) {
            props.cookies.remove('token');
            navigate('/')
            window.location.reload();
        }
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}