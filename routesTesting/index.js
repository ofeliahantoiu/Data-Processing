const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () =>
{
    console.log(`Server is running on port ${PORT}`);
});

let products = [
    { id: 1, name: 'Product A', price: 10.99 },
    { id: 2, name: 'Product B', price: 20.49 }
];

// GET all products
app.get('/products', (req, res) => {
    res.json(products);
});

// GET a single product
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(prod => prod.id === id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// POST a new product
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const id = products.length + 1;
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT (update) an existing product
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const product = products.find(prod => prod.id === id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    product.name = name;
    product.price = price;
    res.json(product);
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(prod => prod.id !== id);
    res.sendStatus(204);
});