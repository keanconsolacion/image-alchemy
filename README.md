# Image Alchemy

This repository contains a Node.js application built with the `sharp` library for image processing. It provides a React.js frontend for a user-friendly interface to perform bulk image transformations, watermarking, and optimization.

**Features:**

- **Image Transformations:**
  - Resize (width, height, fit)
  - Flip/Flop
  - Convert to different formats (e.g., JPG, PNG, WebP, etc.)
  - Add image watermarks

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/keanconsolacion/image-alchemy.git
   ```
2. **Install dependencies:**
   ```bash
   cd image-alchemy/server
   npm install
   cd ../client
   npm install
   ```
3. **Start the server**
   ```bash
   npm start
   ```
4. **Start the frontend**
   ```bash
   npm start dev 
   or 
   npm run build
   ```

## Usage

- Access the application: Open your web browser and navigate to http://localhost:3000 (or the specified port).
- Upload images: Select the images you want to process.

- Configure transformations:
  - Choose the desired transformations (resize, crop, flip/flop, change type).
  - Specify parameters for each transformation (e.g., dimensions, crop coordinates).
  - Add watermarks (optional):
  - Start processing: Click the "Download" button.

- View results: Monitor the progress and view the processed images.

## Other

**Technologies:**

- Node.js: Server-side runtime environment.
- Sharp: High-performance image processing library for Node.js.
- React.js: JavaScript library for building user interfaces.

**Contributing:**
- Contributions are welcome! Please feel free to submit a pull request or open an issue.
