export const extractUniqueCategories = (adsData) => {
  // Create a Set of unique category IDs
  const uniqueCategories = new Set(adsData.map(ad => ad.category_id));
  
  // Convert to array and format
  const categories = Array.from(uniqueCategories).map(categoryId => ({
    id: categoryId,
    name: getCategoryName(categoryId)
  }));
  
  // Add 'All' category at the beginning
  return [
    { id: 'All', name: 'All Items' },
    ...categories
  ];
};

// Helper function to map category IDs to names
const getCategoryName = (categoryId) => {
  const categoryMap = {
    "1": "Laptops",
    "2": "Mobiles",
    "3": "Headphones",
    "4": "Gaming",
    "5": "Tablets",
    "6": "Wearables",
    "7": "Cameras",
    "8": "Smart TVs"
  };
  return categoryMap[categoryId] || `Category ${categoryId}`;
};
