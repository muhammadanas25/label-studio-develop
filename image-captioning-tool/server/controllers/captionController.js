const Caption = require('../models/Caption');
const path = require('path');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCaption = async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;
    
    if (!imageUrl || !caption) {
      return res.status(400).json({ error: 'Image URL and caption are required' });
    }

    const newCaption = new Caption({
      imageUrl,
      caption,
      timestamp: new Date()
    });

    await newCaption.save();
    res.status(201).json(newCaption);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCaptions = async (req, res) => {
  try {
    const captions = await Caption.find().sort({ timestamp: -1 });
    res.json(captions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCaptionsByImage = async (req, res) => {
  try {
    const { imageUrl } = req.params;
    const captions = await Caption.find({ imageUrl }).sort({ timestamp: -1 });
    res.json(captions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 