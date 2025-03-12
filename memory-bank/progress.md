# Progress

**What Works:**
- Basic project structure is set up.
- Refactored the login page to have separate login and signup options.
- Created a separate `Signup.tsx` component for the signup form.
- Updated `App.tsx` to include a route for the signup page.
- Implemented password verification in the `Signup.tsx` component.
- Removed the "Or continue with" option from `Login.tsx`.
- Corrected the email validation regex in `Signup.tsx`.
- Added a console.error in the catch block of the `handleSignUp` function in `Signup.tsx`.
- Modified the `handleSignUp` function in `Signup.tsx` to insert a new row into the `public.users` table after the user is successfully created in Supabase auth, including the user's name.
- Added a name field to the signup form in `Signup.tsx` and bound it to the `name` state variable.
- Removed the password verification check from the `handleSubmit` function in the `Login.tsx` component.
- Removed the `confirmPassword` state variable from the `Login.tsx` component.
- Removed Google Sign-in functionality.
- Implemented the functionality to allow adding products to the cart without logging in, but require login before proceeding to checkout.
- Implemented the logic to insert orders into the `orders` and `order_items` tables in Supabase.
- Updated the `OrderItem` component in `src/components/Profile.tsx` to fetch and display the book name from the `books` table.
- Reduced the bottom margin of the `h1` element in `src/components/Profile.tsx` to fix a display issue.

**What's Left to Build:**
- All application logic and UI components need to be implemented.

**Current Status:**
- Project initialization started. Memory bank initialized.
- Profile management page created with temporary data.
- Implemented separate login and signup pages.
- Removed Google Sign-in functionality.
- Implemented the functionality to allow adding products to the cart without logging in, but require login before proceeding to checkout.
- Implemented the logic to insert orders into the `orders` and `order_items` tables in Supabase.
- Updated the `OrderItem` component in `src/components/Profile.tsx` to fetch and display the book name from the `books` table.
- Reduced the bottom margin of the `h1` element in `src/components/Profile.tsx` to fix a display issue.

**Known Issues:**
- None at this time.
