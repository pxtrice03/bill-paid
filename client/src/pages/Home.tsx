import InvoicePage from "@/components/InvoicePage"
import InvoiceForm from "@/components/InvoiceForm"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

const Home = () => {
    const items = useCart()

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<InvoiceForm items={items} />} />
                    <Route path='/invoice' element={<InvoicePage items={items} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Home