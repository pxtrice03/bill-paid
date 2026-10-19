export interface PrdtProp {
    id: string
    name: string
    category: string
    price: number
    stock: number
    total: number
}

// One line of the client's  bill: an item and how many were taken
export interface BillLine { item: PrdtProp, qty: number }
