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
   ![Room Listing Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/rooms.png)
3. **Room Details**
   ![Room Details Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/details.png)
4. **Checkout Page**
   ![Checkout Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/checkout.png)
5. **Reservation Update Page**
   ![Reservation Update Sceenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/reservation-update.png)
6. **Sign In Page**
   ![Sign In Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/login.png)
7. **Booking Overview**
   ![Booking Overview Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/booking-overview.png)
8. **Supabase Schema**
   ![Supabase Schema Screenshot](https://github.com/OthmaneNissoukin/nextjs-hotel-booking/tree/main/screenshots/supabase-schema.png?raw=true)

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
   # Your supabase schema in case you want to use a custom one, default is `public`
   # In case if you are going to use a custom schema, make sure to expose it to API access in your project settings
   NEXT_PUBLIC_SUPABASE_SCHEMA_ENV=public

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

   # URL TO ALLOW CORS IN CASE YOU WANT TO ACCESS GUESTS DATA WITHIN ANOTHER APP (eg: Back Office)
   # URL must have no trailing slash at the end of it
   NEXT_PUBLIC_BACK_OFFICE_URL=http://localhost:5173
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## IMPORTANT NOTES

- **Database Sessions**: Since Supabase is used as the adapter for authentication, expose the `next_auth` schema in the Supabase dashboard to ensure OAuth providers work properly.
  - More details: [https://authjs.dev/getting-started/adapters/supabase](https://authjs.dev/getting-started/adapters/supabase)
- **Payment Integration**: Reservations will only be created upon successful payment. A webhook at `localhost:3000/api/stripe-webhook-gateway` handles Stripe events (checkout.session.completed). Register this link in your Stripe dashboard.
  - More details: [https://docs.stripe.com/webhooks](https://docs.stripe.com/webhooks)
- **Guests Data**: Since this project is using a table `guests` to save users data including the password, it was necessary to create a `table view (guests_view)` in order to restrict access to all the fields and prevent exposing the password in the API response when that field is not needed. When authenticating a user, the API call reads directly from the original `guests` table to get the user password for verification and this Supabase call will need to be provided with `SUPABASE_SERVICE_ROLE_KEY` to bypass Row Level Security (RLS) since authenticating doesn't have any authenticated user to empower it with his own token itself.
- **View Creation**: Run the following query in your Supabase SQL Editor to create the `guests` view:
  <code>
  CREATE VIEW public.guests_view
  // Ensure this view follows the same RLS policies as the original table using security_invoker
  WITH (security_invoker=on)
  AS
  SELECT id, email, "nationalID", nationality, "countryFlag", fullname, phone, created_at, avatar
  FROM public.guests;
  </code>

## Stripe Test Cards

When testing your Stripe integration, you can use the following test card numbers. These cards are specifically for testing purposes and won't charge real money.

### Basic Test Cards

| Card Number         | Card Type  | Expiration Date | CVC | Usage                              |
| ------------------- | ---------- | --------------- | --- | ---------------------------------- |
| 4242 4242 4242 4242 | Visa       | Any future date | Any | Successful charge                  |
| 4000 0000 0000 0069 | Visa       | Any future date | Any | Card declined (insufficient funds) |
| 4000 0000 0000 0341 | Visa       | Any future date | Any | Card declined (lost card)          |
| 5105 1051 0510 5100 | MasterCard | Any future date | Any | Successful charge                  |
| 6011 1111 1111 1117 | Discover   | Any future date | Any | Successful charge                  |

### Testing Different Scenarios

| Card Number         | Card Type  | Expiration Date | CVC | Usage                                  |
| ------------------- | ---------- | --------------- | --- | -------------------------------------- |
| 5555 5555 5555 4444 | MasterCard | Any future date | Any | Card declined (incorrect CVC)          |
| 4222 2222 2222 2222 | Visa       | Any future date | Any | Successful charge with 3D Secure (ACS) |
| 4000 0025 0000 3155 | Visa       | Any future date | Any | Successful charge (with 3D Secure)     |

### Testing for Successful Payments (Authentication Required)

| Card Number         | Card Type | Expiration Date | CVC | Usage                             |
| ------------------- | --------- | --------------- | --- | --------------------------------- |
| 4000 0035 0000 0020 | Visa      | Any future date | Any | Requires 3D Secure authentication |

### 3D Secure Authentication Testing

Use this card for testing 3D Secure scenarios.

| Card Number         | Card Type | Expiration Date | CVC | Usage                            |
| ------------------- | --------- | --------------- | --- | -------------------------------- |
| 4000 0035 0000 0010 | Visa      | Any future date | Any | Successful charge with 3D Secure |

## Back Office

- **Live Version**: [https://nextjs-hotel-booking-back-office.vercel.app/](https://nextjs-hotel-booking-back-office.vercel.app/)
- **Repo**: [https://github.com/OthmaneNissoukin/nextjs-hotel-booking-back-office](https://github.com/OthmaneNissoukin/nextjs-hotel-booking-back-office)

## Contributing

Feel free to submit issues or pull requests. Contributions, suggestions, and improvements are always welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](./blob/main/Licence.txt) file for details.
