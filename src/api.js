import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

const ssm = new AWS.SSM();

export const fetchApiUrl = async () => {
  const params = {
    Name: '/my-app/api-url',
    WithDecryption: true
  };

  try {
    const response = await ssm.getParameter(params).promise();
    return response.Parameter.Value;
  } catch (error) {
    console.error('Error fetching parameter:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  const API_ENDPOINT = await fetchApiUrl();
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
