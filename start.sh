#!/bin/bash
echo "🐓 Starting SREE SAI TRADERS Platform..."
echo ""

# Start backend
echo "📡 Starting Backend (port 3001)..."
cd backend && npm install --silent && node server.js &
BACKEND_PID=$!

sleep 2

# Start frontend
echo "🎨 Starting Frontend (port 5173)..."
cd ../frontend && npm install --silent && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers started!"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers."

wait
