# System Patterns

**Architecture:** This project appears to be a single-page application (SPA) built with React.

**Design Patterns:**
- Component-based architecture (React components)
- State management (likely using React Context or a state management library like Zustand, based on `src/store` directory)

**Component Relationships:**
- `App.tsx`: The main application component, handling routing and layout.
- `BookDetails.tsx`: Displays details of a specific book.
- `Cart.tsx`: Manages the user's shopping cart.
- `Login.tsx`: Handles user authentication.
- `Navigation.tsx`: Provides navigation within the application, including a link to the profile page for logged-in users.
- `Profile.tsx`: Displays user profile information and order history.
