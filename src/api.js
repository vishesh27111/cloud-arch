export const fetchProducts = async () => {
  const API_ENDPOINT = "https://mrgueq751j.execute-api.us-east-1.amazonaws.com/dev/all-products";
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map(item => ({
      id: parseInt(item.id.N, 10),
      title: item.title.S,
      img: item.img.S,
      price: parseFloat(item.price.N),
      company: item.company.S,
      info: item.info.S,
      inCart: item.inCart.BOOL,
      count: parseInt(item.count.N, 10),
      total: parseFloat(item.total.N)
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
