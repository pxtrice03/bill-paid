const supermarket = {
    name: 'Maxi Purchase',
    taxRate: 0.1925,
    items: [
        { 
            id: 'baguette',
            name: 'Baguette 200g',
            category: 'Boulangerie',
            price: 200,
            stock: 60,
            total: 80
        },
        { 
            id: 'painmie',
            name: 'Pain de mie',
            category: 'Boulangerie',
            price: 800,
            stock: 22,
            total: 30
        },
        { 
            id: 'croissant',
            name: 'Croissant',
            category: 'Pâtisserie',
            price: 250,
            stock: 4,
            total: 40
        },
        { 
            id: 'painchoc',
            name: 'Pain au chocolat',
            category: 'Pâtisserie',
            price: 300,
            stock: 0,
            total: 40
        },
        { 
            id: 'eclair',
            name: 'Éclair',
            category: 'Pâtisserie',
            price: 400,
            stock: 15,
            total: 30
        },
        { 
            id: 'farine',
            name: 'Farine de blé Yana 1kg',
            category: 'Alimentation',
            price: 550,
            stock: 30,
            total: 60
        },
        { 
            id: 'mayo',
            name: 'Mayonnaise 450ml',
            category: 'Alimentation',
            price: 2300,
            stock: 12,
            total: 40
        },
        {
            id: 'sucre',
            name: 'Tatie Sucre blanc',
            category: 'Alimentation',
            price: ,
            stock: 23,
            total: 71
        },
        {
            id: 'beurre900',
            name: 'Beurre Jadida 900G',
            category: 'Alimentation',
            price: ,
            stock: 19,
            price: 68
        },
        {
            id: 'beurre450',
            name: 'Beurre Jadida 450G',
            category: 'Alimentation',
            price: ,
            stock: 19,
            price: 68
        },
        {
            id: 'beurre250',
            name: 'Jadida 250G',
            category: 'Alimentation',
            price: ,
            stock: 29,
            price: 118
        },
        {
            id: 'chocolat425',
            name: 'Chocolat Tartina 425G',
            category: 'Alimentation',
            price: 3800,
            stock: 49,
            price: 2
        },
        {
            id: 'lait',
            name: 'Matinal 900G',
            category: 'Alimentation',
            price: ,
            stock: 9,
            price: 28
        },
        {
            id: 'pain',
            name: 'Pain de farine de ble',
            category: 'Boulangerie',
            price: 100,
            stock: 92,
            total: 100
        },
        {
            id: 'pain',
            name: 'Pain de farine de ble',
            category: 'Boulangerie',
            price: 150,
            stock: 60,
            total: 110
        },
        { 
            id: 'jus',
            name: 'Jus Extra Fresco 1L',
            category: 'Alimentation',
            price: 1200,
            stock: 25,
            total: 30
        },
        { 
            id: 'riz',
            name: 'Riz 1kg',
            category: 'Alimentation',
            price: 700,
            stock: 0,
            total: 50
        },
        { 
            id: 'huile',
            name: 'Huile végétale 1L',
            category: 'Alimentation',
            price: 1500,
            stock: 8,
            total: 60
        },
        { 
            id: 'savon',
            name: 'Savon de toilette',
            category: 'Parfumerie',
            price: 400,
            stock: 40,
            total: 50
        },
        { 
            id: 'deo',
            name: 'Déodorant',
            category: 'Parfumerie',
            price: 1500,
            stock: 10,
            total: 30
        },
        { 
            id: 'surf',
            name: 'Détergent Surf',
            category: 'Bazar',
            price: 750,
            stock: 35,
            total: 50
        },
        { 
            id: 'seau',
            name: 'Seau plastique',
            category: 'Bazar',
            price: 1500,
            stock: 9,
            total: 20
        },
        { 
            id: 'bougies',
            name: 'Bougies (pack)',
            category: 'Bazar',
            price: 500,
            stock: 3,
            total: 30
        },
        { 
            id: 'cone',
            name: 'Glace italienne (cône)',
            category: 'Glaces',
            price: 500,
            stock: 70,
            total: 100
        },
        { 
            id: 'glacepot',
            name: 'Glace pot 1L',
            category: 'Glaces',
            price: 2500,
            stock: 2,
            total: 20
        },
    ],
    handedCash: (cash: number) => Math.ceil(cash / 1000) * 1000
}

export default supermarket