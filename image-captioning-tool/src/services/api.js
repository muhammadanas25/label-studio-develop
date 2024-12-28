const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  return response.json();
};

export const addCaption = async (imageUrl, caption) => {
  const response = await fetch(`${API_URL}/captions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl, caption }),
  });

  if (!response.ok) {
    throw new Error('Failed to add caption');
  }

  return response.json();
};

export const getCaptions = async () => {
  const response = await fetch(`${API_URL}/captions`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch captions');
  }

  return response.json();
};

export const getCaptionsByImage = async (imageUrl) => {
  const response = await fetch(`${API_URL}/captions/${encodeURIComponent(imageUrl)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch captions for image');
  }

  return response.json();
}; 