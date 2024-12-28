# Image Captioning Tool

A minimal image captioning tool extracted from Label Studio. This tool allows users to add captions to images with a clean and simple interface.

## Features

- Image display with responsive design
- Sticky caption input area
- Simple submission and validation
- Modern UI with smooth interactions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Usage

1. Place your images in the `public` folder
2. Update the `imageUrl` prop in `App.js` to point to your image
3. The tool will display the image and provide a text area for entering captions
4. Captions are saved and can be accessed through the `onSubmit` callback

## Structure

```
image-captioning-tool/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── ImageCaptioning.js
│   ├── styles/
│   │   └── global.css
│   ├── App.js
│   └── index.js
└── package.json
```

## Customization

You can customize the tool by:
- Modifying the styles in `ImageCaptioning.js`
- Adjusting the layout in `App.js`
- Adding new features to the components
- Implementing different storage solutions for the captions

## Contributing

Feel free to submit issues and enhancement requests! 