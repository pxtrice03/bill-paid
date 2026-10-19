import { Outlet } from "react-router"

const AppLayout = () => {
    return (
        <>
            <main className="p-4">
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout