import React, { useState } from 'react';

const formData = {
    username: "",
    password: ""
}

const Login = ({ isLoginState }) => {
    const [details, setDetails] = useState(formData);
    const [submitted, setSubmitted] = useState(false);
    const [message, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validatePassword(details.password)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details),
            };
            try {
                const process = await fetch(`https://dummyjson.com/auth/login`, requestOptions);
                if (!process.ok) {
                    setErrorMessage('Invalid Credentials.');
                    return;
                }
                const response = await process.json();
                if (response) {
                    setTimeout(() => {
                        setSubmitted(true);
                        //let override the role since I cannot find any on dummy json server
                        const updatedResponse = { ...response, type: "Editor" };
                        isLoginState(true, updatedResponse); // set this to get the user roles is there's any
                    }, 500);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        } else {
            setErrorMessage('Password does not meet the requirements.');
        }
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const onChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className={`login-background ${submitted ? 'submitted' : 'not-submitted'}`}>
            <div className={`login-page ${submitted ? 'submitted' : 'not-submitted'}`}>
                <h1 className="login-title">Sign In</h1>
                <p>Please enter your username and password to login.</p>
                <form className="form-login" onSubmit={handleLogin}>
                    <div className="apps-input-container">
                        <input type="text" placeholder=" " onChange={onChange} name="username" />
                        <label htmlFor="textInput">Username</label>
                    </div>

                    <div className="apps-input-container">
                        <input
                            type="password"
                            placeholder=" "
                            onChange={onChange} name="password"
                        />
                        <label htmlFor="passwordInput">Password</label>
                    </div>
                    <div>
                        {message && <p className="error-message">{message}</p>}
                    </div>
                    <div>
                        <button className="apps-btn apps-btn-block apps-btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
