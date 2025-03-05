import { Link } from "react-router-dom"

export default function PageNotFound() {
    return (
        <div className="not-found">
            <h1>404: Page not Found</h1>
            <p>Return to <Link to='/'>Login</Link> or <Link to='/register'>Register</Link> Page</p>
        </div>
    )
}