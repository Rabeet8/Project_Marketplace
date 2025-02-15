const adsData = [
  {
    "title": "MacBook Pro 16-inch M1",
    "description": "Powerful MacBook Pro with M1 chip, 16GB RAM, and 1TB SSD adfsf qeqwe qweq eqew 123 qweqwe qweq eqqw qweqw eqwe.",
    "brand_id": 1,
    "model": "MacBook Pro 2021",
    "rating": 9,
    "img_id": 101,
    "city": "Los Angeles",
    "timestamp": "2024-02-01 12:30:00",
    "longitude": "34.0522",
    "latitude": "-118.2437",
    "category_id": "2", // Changed from 1 to 2 (Laptops)
    "price": 2300,
    "user_id": 11,
    "ad_id": 1,
  },
  {
    "title": "HP Spectre x360 Convertible",
    "description": "A sleek and powerful 2-in-1 laptop with an Intel i7 processor.",
    "brand_id": 12,
    "model": "Spectre x360",
    "rating": 8,
    "img_id": 102,
    "city": "New York",
    "timestamp": "2024-02-02 14:15:00",
    "longitude": "40.7128",
    "latitude": "-74.0060",
    "category_id": "2", // Changed from 1 to 2 (Laptops)
    "price": 1800,
    "user_id": 12
  },
  {
    "title": "Samsung Galaxy S23 Ultra",
    "description": "Latest flagship phone with 200MP camera and Snapdragon 8 Gen 2.",
    "brand_id": 2,
    "model": "Galaxy S23 Ultra",
    "rating": 10,
    "img_id": 103,
    "city": "Chicago",
    "timestamp": "2024-02-03 09:45:00",
    "longitude": "41.8781",
    "latitude": "-87.6298",
    "category_id": "3", // Changed from 2 to 3 (Mobiles)
    "price": 1200,
    "user_id": 13
  },
  {
    "title": "Google Pixel 7 Pro",
    "description": "Pixel 7 Pro with Tensor G2 chip and the best camera experience.",
    "brand_id": 4,
    "model": "Pixel 7 Pro",
    "rating": 9,
    "img_id": 104,
    "city": "San Francisco",
    "timestamp": "2024-02-04 16:20:00",
    "longitude": "37.7749",
    "latitude": "-122.4194",
    "category_id": "3", // Changed from 2 to 3 (Mobiles)
    "price": 900,
    "user_id": 14
  },
  {
    "title": "Sony WH-1000XM5 Wireless Headphones",
    "description": "Industry-leading noise cancellation and immersive sound.",
    "brand_id": 15,
    "model": "WH-1000XM5",
    "rating": 10,
    "img_id": 105,
    "city": "Seattle",
    "timestamp": "2024-02-05 11:10:00",
    "longitude": "47.6062",
    "latitude": "-122.3321",
    "category_id": "4", // Changed from 3 to 4 (Headphones)
    "price": 350,
    "user_id": 15
  },
  {
    "title": "Apple AirPods Pro 2nd Gen",
    "description": "Active Noise Cancellation and adaptive transparency mode.",
    "brand_id": 1,
    "model": "AirPods Pro 2",
    "rating": 9,
    "img_id": 106,
    "city": "Houston",
    "timestamp": "2024-02-06 13:40:00",
    "longitude": "29.7604",
    "latitude": "-95.3698",
    "category_id": "4", // Changed from 3 to 4 (Headphones)
    "price": 250,
    "user_id": 16
  },
  {
    "title": "Sony PlayStation 5",
    "description": "Experience next-gen gaming with stunning graphics and fast load times.",
    "brand_id": 15,
    "model": "PlayStation 5",
    "rating": 10,
    "img_id": 107,
    "city": "Phoenix",
    "timestamp": "2024-02-07 18:30:00",
    "longitude": "33.4484",
    "latitude": "-112.0740",
    "category_id": "5", // Changed from 4 to 5 (Gaming)
    "price": 500,
    "user_id": 17
  },
  {
    "title": "Xbox Series X",
    "description": "The most powerful Xbox console ever with 4K gaming.",
    "brand_id": 15,
    "model": "Xbox Series X",
    "rating": 9,
    "img_id": 108,
    "city": "Denver",
    "timestamp": "2024-02-08 20:50:00",
    "longitude": "39.7392",
    "latitude": "-104.9903",
    "category_id": "5", // Changed from 4 to 5 (Gaming)
    "price": 500,
    "user_id": 18
  },
  {
    "title": "Samsung Galaxy Tab S8 Ultra",
    "description": "12.4-inch AMOLED display and S Pen support.",
    "brand_id": 2,
    "model": "Galaxy Tab S8 Ultra",
    "rating": 9,
    "img_id": 109,
    "city": "San Diego",
    "timestamp": "2024-02-09 15:25:00",
    "longitude": "32.7157",
    "latitude": "-117.1611",
    "category_id": "6", // Changed from 5 to 6 (Tablets)
    "price": 800,
    "user_id": 19
  },
  {
    "title": "Apple iPad Pro M2",
    "description": "Powerful M2 chip with Apple Pencil support.",
    "brand_id": 1,
    "model": "iPad Pro 12.9-inch",
    "rating": 10,
    "img_id": 110,
    "city": "Boston",
    "timestamp": "2024-02-10 10:15:00",
    "longitude": "42.3601",
    "latitude": "-71.0589",
    "category_id": "6", // Changed from 5 to 6 (Tablets)
    "price": 1100,
    "user_id": 20
  },
  {
    "title": "Apple Watch Series 8",
    "description": "Advanced health tracking and always-on display.",
    "brand_id": 1,
    "model": "Watch Series 8",
    "rating": 9,
    "img_id": 111,
    "city": "Dallas",
    "timestamp": "2024-02-11 08:45:00",
    "longitude": "32.7767",
    "latitude": "-96.7970",
    "category_id": "7", // Changed from 6 to 7 (Wearables)
    "price": 400,
    "user_id": 21
  },
  {
    "title": "Samsung Galaxy Watch 5 Pro",
    "description": "Long battery life and fitness tracking.",
    "brand_id": 2,
    "model": "Galaxy Watch 5 Pro",
    "rating": 8,
    "img_id": 112,
    "city": "Miami",
    "timestamp": "2024-02-12 07:30:00",
    "longitude": "25.7617",
    "latitude": "-80.1918",
    "category_id": "7", // Changed from 6 to 7 (Wearables)
    "price": 350,
    "user_id": 22
  },
  {
    "title": "Canon EOS R6 Mirrorless Camera",
    "description": "Professional mirrorless camera with 4K recording.",
    "brand_id": 15,
    "model": "EOS R6",
    "rating": 9,
    "img_id": 113,
    "city": "Orlando",
    "timestamp": "2024-02-13 12:00:00",
    "longitude": "28.5383",
    "latitude": "-81.3792",
    "category_id": "8", // Changed from 7 to 8 (Cameras)
    "price": 2500,
    "user_id": 23
  },
  {
    "title": "Sony Bravia 65-inch 4K Smart TV",
    "description": "OLED display with Google TV integration.",
    "brand_id": 15,
    "model": "Bravia XR A95K",
    "rating": 10,
    "img_id": 114,
    "city": "Las Vegas",
    "timestamp": "2024-02-14 14:05:00",
    "longitude": "36.1699",
    "latitude": "-115.1398",
    "category_id": "9", // Changed from 8 to 9 (Smart TVs)
    "price": 2000,
    "user_id": 24
  }
].map(ad => ({
  ...ad,
  category_id: ad.category_id.toString() // Convert all category_ids to strings
}));

export default adsData;
