# Hotel Booking System

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
- **Unconfirmed Reservations**: All bookings are marked as unconfirmed and can be confirmed upon arrival (back office still in development).

## Technologies Used

### Front-end

- **Next.js**: Server-Side Rendering (SSR), Client-Side Rendering (CSR), and API routes.
- **CSS**: Fully customized styling using pure CSS.
- **React Leaflet**: For map integration.
- **DayPicker**: For friendly date selection.
- **date-fns**: For handling date manipulation.
- **Zod**: For form validation.
- **Memoization**: Applied to prevent unnecessary re-renders.

### Back-end

- **Supabase**: Used as the database for storing and retrieving reservation and user data.
- **bcrypt**: For secure password hashing and comparison.
- **Auth.js**: For authentication (credentials and OAuth with Google and Facebook).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OthmaneNissoukin/hotel-booking-system.git
   cd hotel-booking-system
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env.local` file in the root directory and include the following:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_CLIENT_ID=your-facebook-client-id
   FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Screenshots

1. **Homepage**
   ![Homepage Screenshot](https://github.com/OthmaneNissoukin/hotel-booking-system/blob/master/screenshots/homepage.png)
2. **Room Listing**
   ![Room Listing Screenshot](https://github.com/OthmaneNissoukin/hotel-booking-system/blob/master/screenshots/rooms.png)
3. **Room Details**
   ![Room Details Screenshot](https://github.com/OthmaneNissoukin/hotel-booking-system/blob/master/screenshots/details.png)
4. **Checkout Page**
   ![Checkout Screenshot](https://github.com/OthmaneNissoukin/hotel-booking-system/blob/master/screenshots/checkout.png)

## Future Development

- **Back Office**: The next phase will include building the back office for reservation management, where admins can confirm or cancel reservations.
- **Payment Integration**: While this is a practice project, future iterations could include payment gateway integration for live transactions.

## Contributing

Feel free to submit issues or pull requests. Contributions, suggestions, and improvements are always welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
