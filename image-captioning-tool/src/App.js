import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageCaptioning from './components/ImageCaptioning';
import { getCaptions } from './services/api';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const CaptionsList = styled.div`
  margin-top: 40px;
`;

const CaptionCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    max-width: 200px;
    height: auto;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin: 5px 0;
  }

  .timestamp {
    color: #999;
    font-size: 12px;
  }
`;

function App() {
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCaptions();
  }, []);

  const loadCaptions = async () => {
    try {
      const data = await getCaptions();
      setCaptions(data);
    } catch (err) {
      setError('Failed to load captions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnnotationSubmit = async (annotation) => {
    setCaptions([annotation, ...captions]);
  };

  return (
    <AppContainer>
      <Header>Image Captioning Tool</Header>
      
      <ImageCaptioning onSubmit={handleAnnotationSubmit} />
      
      <CaptionsList>
        <h2>Recent Captions</h2>
        {loading && <p>Loading captions...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {captions.map((item, index) => (
          <CaptionCard key={index}>
            <img src={item.imageUrl} alt="Captioned content" />
            <p>{item.caption}</p>
            <p className="timestamp">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </CaptionCard>
        ))}
      </CaptionsList>
    </AppContainer>
  );
}

export default App; 