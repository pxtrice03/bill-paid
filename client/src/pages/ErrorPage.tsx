import { NavLink } from "react-router"

const ErrorPage = () => {
    return (
        <main style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', minHeight: '100vh'}}>
            <h1>Oups! <strong>404 Page Not Found</strong></h1>
            <NavLink to='/'>Go back home</NavLink>
        </main>
    )
}

export default ErrorPage