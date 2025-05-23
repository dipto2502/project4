const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
import './index.css';

// Enable CORS
app.use(cors());

// Dummy menu data
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 12.99,
    image: "https://via.placeholder.com/400x300?text=Margherita+Pizza"
  },
  {
    id: 2,
    name: "Spaghetti Carbonara",
    price: 14.49,
    image: "https://via.placeholder.com/400x300?text=Spaghetti+Carbonara"
  },
  {
    id: 3,
    name: "Tiramisu",
    price: 6.50,
    image: "https://via.placeholder.com/400x300?text=Tiramisu"
  }
];

// Define a route
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
