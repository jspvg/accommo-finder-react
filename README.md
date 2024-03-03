# Accommodation Booking App

This is a web application for booking accommodations, built with React, TypeScript, and Vite. The app fetches accommodation data from an API and displays it on the page. Users can filter accommodations based on dates, number of people, and selected amenities.

## Project Structure

The project is structured as follows:

- `src/`: This directory contains all the TypeScript and React code.
- `.env`: This file contains environment variables. The API endpoint URL is stored in the `VITE_API_URL` variable.

## Features

- **Accommodation Cards**: Each accommodation is displayed as a card with the title, picture, capacity (max number of people), and distance from the beach. Users can expand the card to view more information, such as amenities and price per night.
- **Filters**: Users can filter accommodations based on dates (only available accommodations are shown), number of people, and amenities.
- **Reservation**: Users can reserve an accommodation. After clicking the "reserve" button, they are shown a modal with a success message and all the details of the reservation. There is also a button that takes the user back to the original page with all the accommodations.

## Setup and Installation

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Start the development server with `npm run dev`.

## Deployment

The site is deployed on Netlify.

## Note on Dates

Price and availability intervals work on a first-come, first-served basis. This means that the last date of the interval is not included in it (on that date the guest leaves, the accommodation is ready for new guests), but it is initial (on that date a guest of the night in the accommodation).
