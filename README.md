# Backend API Proxy

A simple, reusable backend service for handling API keys and proxying API requests for multiple front-end applications.

## Features

- Securely stores API keys
- Proxies API requests to third-party services
- Reusable for multiple front-end projects
- Built with Express.js for flexibility and ease of use

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devholdt/backend-api-proxy.git
   cd backend-api-proxy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your API key:

   ```bash
   API_KEY=your_api_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Usage

Make API requests to the backend service instead of directly to the third-party API. For example:

```javascript
fetch('https://your-backend-api-proxy-url.com/api/data)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error fetching data:', error));
```

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License.
