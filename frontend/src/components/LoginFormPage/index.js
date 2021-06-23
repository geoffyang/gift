import { useState } from 'react'
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// internal imports
import './LoginForm.css'

function LoginFormPage() {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return (
        <Redirect to="/" />
    );


    function handleSubmit(e) {
        e.preventDefault();
        setErrors([])
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label for="credential">Enter your name: </label>
            <input type='text'
                name="credential"
                placeholder="username or email"
                value={credential}
                onChange={e => setCredential(e.target.value)}
            />
            <label for="password">Enter your pass: </label>
            <input type='password'
                name="password"
                placeholder="passworddd"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Submit Login</button>
        </form>
    )

}

export default LoginFormPage;
