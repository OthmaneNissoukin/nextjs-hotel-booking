# Hotel Booking System

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [Important Notes](#important-notes)
7. [Stripe Test Cards](#stripe-test-cards)
8. [Back Office](#back-office)
9. [Contributing](#contributing)
10. [License](#license)

## Overview

Hotel Booking System is a full-stack web application designed to streamline the process of reserving hotel rooms. This project represents the **front office** of a hotel reservation management system, offering users an intuitive and user-friendly interface to search, filter, and book available rooms.

This app is built using **Next.js** for the front-end and **Supabase** for the database. It integrates several key libraries such as **bcrypt** for password security, **Auth.js** for authentication, and **Zod** for form validation. The system is designed to provide a smooth booking experience with features such as date filtering, sorting by guests and price, and user profile management.

## Features

- **Homepage with Offers**: A dynamic homepage showcasing available offers, hotel description, and a **React Leaflet** map displaying the hotel location.
- **Booking Form**: Users can select a date range, and the system will display available rooms for that period.
- **Room Sorting**: Sorting functionality based on the number of guests and price.
- **Detailed Room Pages**: Each room has a dedicated page with a detailed description, booking form, and disabled dates for already reserved periods.
- **Authentication**: The system supports both credential-based login and **OAuth** with Google and Facebook providers via **Auth.js**.
- **Checkout Process**: Users are forwarded to a checkout page after selecting a room. If not authenticated, they are redirected to the login/signup page.
- **Profile Management**: Users can update their profile, check their reservation history, cancel unconfirmed reservations, and delete past ones.
- **Unconfirmed Reservations**: All bookings are marked as unconfirmed and can be confirmed upon arrival.
- **Compound Components**: Reusable and flexible components are implemented for forms, modals, and inputs to ensure better code organization and scalability.

## Screenshots

1. **Homepage**
   ![Homepage Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/homepage.png)
2. **Room Listing**
   ![Room Listing Screenshot](https://github.com/OthmaneNissoukinnextjs-hotel-booking/tree/main/screenshots/rooms.png)
3. **Room Details**
   ![Room Details Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/details.png)
4. **Checkout Page**
   ![Checkout Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/checkout.png)
5. **Reservation Update Page**
   ![Checkout Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/reservation-update.png)
6. **Sign In Page**
   ![Checkout Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/login.png)

## Technologies Used

### Front-end

- **Next.js**: Server-Side Rendering (SSR), Client-Side Rendering (CSR), and API routes.
- **CSS**: Fully customized styling using pure CSS.
- **React Leaflet**: For map integration.
- **DayPicker**: For friendly date selection.
- **date-fns**: For handling date manipulation.
- **Zod**: For form validation.
- **React Hot Toast**: Showing user-friendly feedback for errors, success, and other statuses.
- **Memoization**: Applied to prevent unnecessary re-renders.
- **Compound Components**: Utilized to create cohesive and reusable UI components.

### Back-end

- **Supabase**: Used as the database for storing and retrieving reservation and user data.
- **bcrypt**: For secure password hashing and comparison.
- **Auth.js**: For authentication (credentials and OAuth with Google and Facebook).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OthmaneNissoukin/nextjs-hotel-booking.git
   cd nextjs-hotel-booking
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env.local` file in the root directory and include the following:

   ```env
   # SUPABASE
   NEXT_PUBLIC_SUPABASE_URL=YOUR-SUPABASE-URL
   NEXT_PUBLIC_SUPABASE_KEY=YOUR-SUPABASE-PUBLIC-KEY
   NEXT_PUBLIC_SUPABASE_IMGS_URL=YOUR-SUPABASE-IMGS-BUCKET-URL
   SUPABASE_JWT_SECRET=YOUR-SUPABASE-JWT-SECRET
   SUPABASE_SERVICE_ROLE_KEY=YOUR-SUPABASE-SERVICE-ROLE-KEY

   # NEXTAUTH
   NEXTAUTH_URL=http://localhost:3000/
   AUTH_SECRET=YOUR-AUTH-SECRET

   # NEXTAUTH GOOGLE PROVIDER
   AUTH_GOOGLE_ID=YOUR-GOOGLE-AUTH-ID
   AUTH_GOOGLE_SECRET=YOUR-GOOGLE-SECRET

   # NEXTAUTH FACEBOOK PROVIDER
   AUTH_FACEBOOK_ID=YOUR-FACEBOOK-AUTH-ID
   AUTH_FACEBOOK_SECRET=YOUR-FACEBOOK-SECRET

   AUTH_TRUST_HOST=http://localhost:3000

   # STRIPE PAYMENT
   STRIPE_SECRET_KEY=YOUR-STRIPE-SECRET-KEY
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR-STRIPE-PUBLISHABLE-KEY

   # PRODUCTION URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## IMPORTANT NOTES

- **Database Sessions**: Since Supabase is used as the adapter for authentication, expose the `next_auth` schema in the Supabase dashboard to ensure OAuth providers work properly.
  - More details: [https://authjs.dev/getting-started/adapters/supabase](https://authjs.dev/getting-started/adapters/supabase)
- **Payment Integration**: This version does not include payment features and it is no longer synced with the hosted version at vercel. If you want to a version without payment integrated you can you this, otherwise you can switch to the main branch of this repo which will be synced and updated when needed.

## Back Office

- **Live Version**: [https://nextjs-hotel-booking-back-office.vercel.app/](https://nextjs-hotel-booking-back-office.vercel.app/)
- **Repo**: [https://github.com/OthmaneNissoukin/nextjs-hotel-booking-back-office](https://github.com/OthmaneNissoukin/nextjs-hotel-booking-back-office)

## Contributing

Feel free to submit issues or pull requests. Contributions, suggestions, and improvements are always welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](./blob/main/Licence.txt) file for details.
