import React from 'react';

const MenuPage = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Juicy beef patty, lettuce, tomato, onion, cheese, and our special sauce on a toasted bun.',
      price: '$9.99',
      image: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg', // Replace with actual image path
    },
    {
      id: 2,
      name: 'Spicy Chicken Sandwich',
      description: 'Crispy fried chicken breast tossed in a spicy sauce with pickles and coleslaw.',
      price: '$10.50',
      image: 'https://meikoandthedish.com/wp-content/uploads/2023/07/spicy-southern-buttermilk-fried-chicken-7.jpg', // Replace with actual image path
    },
    {
      id: 3,
      name: 'Vegetarian Pizza',
      description: 'A delicious pizza topped with a variety of fresh vegetables and mozzarella cheese.',
      price: '$12.00',
      image: 'https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg', // Replace with actual image path
    },
    {
      id: 4,
      name: 'Pasta Carbonara',
      description: 'Spaghetti with a creamy sauce made from eggs, cheese, pancetta, and black pepper.',
      price: '$11.75',
      image: 'https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg', // Replace with actual image path
    },
    {
      id: 5,
      name: 'Fresh Salad',
      description: 'A mix of seasonal greens with your choice of dressing and protein add-ons.',
      price: '$8.50',
      image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Cobb-Salad-main.jpg', // Replace with actual image path
    },
    {
      id: 6,
      name: 'Chocolate Brownie',
      description: 'Warm and fudgy chocolate brownie served with a scoop of vanilla ice cream.',
      price: '$6.00',
      image: 'https://bluebowlrecipes.com/wp-content/uploads/2024/06/fudgy-brown-butter-brownies-4134.jpg', // Replace with actual image path
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Delicious Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="rounded-lg overflow-hidden shadow-sm">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-500 font-bold">{item.price}</span>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>Craving something else? <a href="#" className="text-red-500 hover:underline">See our full menu</a></p>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;