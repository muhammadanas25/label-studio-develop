import React, { useState } from 'react';
import styled from 'styled-components';
import { uploadImage, addCaption } from '../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
  border-radius: 4px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const UploadContainer = styled.div`
  border: 2px dashed #ddd;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border-color: #2196f3;
  }
`;

const CaptionContainer = styled.div`
  position: sticky;
  top: 0;
  background: #f1f1f1;
  padding: 15px;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const SubmitButton = styled.button`
  background: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #1976d2;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 10px;
  font-size: 14px;
`;

const ImageCaptioning = ({ onSubmit }) => {
  const [caption, setCaption] = useState('');
  const [currentImage, setCurrentImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      setError('');
      const { imageUrl } = await uploadImage(file);
      setCurrentImage(imageUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentImage || !caption.trim()) return;

    try {
      setLoading(true);
      setError('');
      const result = await addCaption(currentImage, caption.trim());
      onSubmit(result);
      setCaption('');
    } catch (err) {
      setError('Failed to save caption. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {!currentImage ? (
        <UploadContainer>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            Click or drag an image here to upload
          </label>
        </UploadContainer>
      ) : (
        <ImageContainer>
          <Image src={currentImage} alt="Content to be captioned" />
        </ImageContainer>
      )}
      
      {currentImage && (
        <CaptionContainer>
          <TextArea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter description here..."
            rows="5"
            disabled={loading}
          />
          <SubmitButton
            onClick={handleSubmit}
            disabled={!caption.trim() || loading}
          >
            {loading ? 'Saving...' : 'Submit Caption'}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </CaptionContainer>
      )}
    </Container>
  );
};

export default ImageCaptioning; 