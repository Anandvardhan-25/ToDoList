ToDo MEAN Full Project (Backend + Angular Frontend - Angular Material UI)

1) Backend
  - Location: backend/
  - Steps:
    cd backend
    npm install
    # Edit .env and set your MongoDB Atlas URI (MONGO_URI)
    npm run dev

2) Frontend
  - Location: frontend/
  - Steps:
    cd frontend
    npm install
    # You can run the frontend with:
    npx ng serve --open
    # or if you have angular cli installed globally:
    ng serve --open

Notes:
  - The frontend expects the backend API at http://localhost:5000/api
  - If you want to serve the frontend from the backend in production, build the frontend and serve static files.
  - Replace <your_username> and <your_password> in backend/.env with your MongoDB Atlas credentials.
