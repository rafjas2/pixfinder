# PixFinder 📸

PixFinder is a React-based image search application that allows users to seamlessly search for stunning, high-quality images provided by the [Pixabay API](https://pixabay.com/api/docs/). 



## ✨ Features

- **Dynamic Image Search**: Instantly search for images using keywords.
- **Responsive Gallery**: Images are displayed beautifully in a responsive, flex-based grid.
- **Detailed Modal View**: Clicking on an image opens a focused modal displaying the full image alongside the author's avatar and name.
- **Graceful Error Handling**: Catch and elegantly display errors when API requests fail. 
- **Header Reset**: Click the application title to quickly clear the search and return to the home view.

## 🛠️ Technology Stack

- **React** (Bootstrapped with standard Create React App tools from its era)
- **Vanilla CSS** (Custom responsive design with clean media queries and CSS animations)
- **Pixabay REST API** (For retrieving image metadata)

## 🏗️ Architecture

The app is broken down into simple, focused components:
- `App.js`: The root component managing the reset state.
- `Header.js` & `Footer.js`: Layout wrappers.
- `Hero.js`: The welcoming landing layout before a search is executed.
- `Search.js`: Handles user input and executes the `fetch` request to the Pixabay API.
- `Gallery.js`: Iterates over the API response to render the image grid.
- `Modal.js`: Handles the overlay logic for viewing specific image details.

## 📁 Folder Structure

```text
pixfinder/
├── public/
│   ├── index.html        # Main HTML template
│   └── ...
├── src/
│   ├── images/           # Static assets (SVGs, Backgrounds)
│   ├── App.js            # Main application container
│   ├── App.css           # Global UI styles and media queries
│   ├── Header.js         # Top navigation and App reset trigger
│   ├── Hero.js           # Initial landing view
│   ├── Search.js         # Search bar and API data fetching logic
│   ├── Gallery.js        # Maps API data to image grid
│   ├── Modal.js          # Overlay view for image details
│   └── index.js          # React application entry point
├── package.json          # Project dependencies and npm scripts
└── README.md             # Project documentation
```

## 🧠 Skills Demonstrated

- **React Fundamentals**: Component lifecycle, functional/class architecture, and optimal component nesting.
- **State Management**: Managing complex loading, error, and dynamic data states (`useState`) without relying on external libraries.
- **Asynchronous JavaScript**: Fetching, parsing, and smoothly rendering third-party REST API data using Promises/`fetch`.
- **Responsive Web Design**: Utilizing Vanilla CSS, Flexbox, and media queries to ensure a flawless experience on both mobile and desktop screens.
- **UI/UX Principles**: Implemented interactive hover states, smooth modal overlays, and fallback UI for loading/error scenarios.

## 🚀 Getting Started

### Prerequisites
You will need a free API Key from [Pixabay](https://pixabay.com/api/docs/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rafjas2/pixfinder.git
   cd pixfinder
   ```

2. Install the necessary NPM packages:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file in the root directory and add your Pixabay API credentials:
   ```env
   REACT_APP_PIXABAY_API_URL=https://pixabay.com/api
   REACT_APP_PIXABAY_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` to view it in the browser.

## 📦 Building for Production

To create an optimized production build:
```bash
npm run build
```
The build output will be located in the `build/` folder, ready to be deployed to Vercel, Netlify, or any static hosting service.

---
*Built by Rafal Jasinski*
