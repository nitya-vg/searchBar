# SearchBar

This project provides a minimal setup to get React working in Vite with HMR and some ESLint rules. It includes a simple search bar component that can be integrated into any React application.

## Features

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **HMR**: Hot Module Replacement for instant updates.
- **ESLint**: A tool for identifying and fixing linting issues.


## Usage

To use the search bar component in your project, follow these steps:

1. Clone the repository:
    ```sh
    git clone /Users/nityavg/Documents/codeRepos/test/searchBar
    ```
2. Install dependencies:
    ```sh
    cd searchBar
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```
4. Import and use the search bar component in your React application:
    ```jsx
    import SearchBar from './components/SearchBar';

    function App() {
      return (
         <div>
            <h1>My Application</h1>
            <SearchBar />
         </div>
      );
    }

    export default App;
    ```
    ## Running the Project

    To run the project, use the following commands:

    - **Start the development server**:
        ```sh
        npm run dev / npm start
        ```
    - **Run tests**:
        ```sh
        npm test
        ```
    - **Build the project for production**:
        ```sh
        npm run build
        ```
    - **Preview the production build**:
        ```sh
        npm run preview
        ```
    - **Run ESLint**:
        ```sh
        npm run lint
        ```
    

