# Roxiler Systems Assignment

## Folder Structure

- **client/**: Contains the frontend code built with React.js.
- **server/**: Contains the backend code built with Node.js and Express.js.

---

## Installation and Setup Instructions

### Backend Setup (server)

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the following environment variables:
    ```bash
    PORT=your_server_port
    CORS_ORIGIN=your_frontend_url
    MONGO_URL=your_mongo_database_uri
    GIVEN_API_URL=third_party_api_url
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

   The server will run on the specified `PORT`.

### Frontend Setup (client)

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```
    
3. Start the React application:
    ```bash
    npm run dev
    ```

   The frontend will run on `http://localhost:5173`.

---

## Usage

1. Ensure MongoDB is running locally or provide a cloud MongoDB URL in the `.env` file.
2. Run both the backend and frontend servers using the instructions above.
