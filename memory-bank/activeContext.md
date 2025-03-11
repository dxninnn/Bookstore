# Active Context

**Current Task:** Refactor the login page to have separate login and signup options.

**Next Steps:**
- Remove the password verification check from the `handleSubmit` function in the `Login.tsx` component.
- Remove the `confirmPassword` state variable from the `Login.tsx` component.
- Modify the `handleSignUp` function in `Signup.tsx` to insert a new row into the `public.users` table after the user is successfully created in Supabase auth, including the user's name.
- Add a name field to the signup form in `Signup.tsx` and bind it to the `name` state variable.
- Correct the email validation regex in `Signup.tsx`.
- Add a console.error in the catch block of the `handleSignUp` function in `Signup.tsx`.
- Create a separate `Signup.tsx` component for the signup form.
- Update `App.tsx` to include a route for the signup page.
- Implement password verification in the `Signup.tsx` component.
- Remove the "Or continue with" option from `Login.tsx`.
- Implement the `handleSignInWithGoogle` function in `Login.tsx` to call `supabase.auth.signInWithOAuth`.
- Update the Google login button to call the `handleSignInWithGoogle` function.
- Update the `activeContext.md` file to reflect the changes.
