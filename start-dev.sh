#!/bin/bash
# Start backend
cd server
npm run dev &
pid1=$!

# Start frontend
cd ../client
npm run dev &
pid2=$!

# Wait for both
wait $pid1 $pid2
