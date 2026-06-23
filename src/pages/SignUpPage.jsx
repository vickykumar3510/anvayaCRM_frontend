import "../App.css"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify";

const SignUpPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const accountHandler = async () => {
        const signUpAuth = await fetch('https://major-project2-backend-xi.vercel.app/auth/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })

        const signUpData = await signUpAuth.json()

        if (signUpAuth.ok) {
            toast.success("New Account created.");
            navigate("/")
        } else {
            toast.error(signUpData.message || "User already exists. Please sign in instead.");
        }
    }

    return (
        <main className="auth-page auth-page--signup">
            <div className="auth-card">
                <p className="auth-brand">workasana</p>
                <h3 className="auth-title">Create your account</h3>
                <p className="auth-subtitle">
                    Please fill in the details below to get started
                </p>

                <div className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            id="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="auth-actions">
                        <button
                            className="auth-btn"
                            type="button"
                            onClick={accountHandler}
                            disabled={!name || !password || !email}
                        >
                            Create account
                        </button>

                        <div className="auth-footer">
                            <p className="auth-footer-text">Already have an account?</p>
                            <Link className="auth-link" to="/">Back to Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUpPage
