# Pokémon Table App

## Description
The Pokémon App is a web application built using Angular and Angular Material, which fetches data from the [Pokémon API](https://pokeapi.co/) to display a list of Pokémon in a table. It allows users to search for Pokémon by name, filter by type, and view detailed information about each Pokémon. The application also features pagination to handle large datasets efficiently.

## Libraries & Decisions

### Angular
- The application is built using **Angular** as the frontend framework. It provides a structured, scalable, and maintainable architecture for building single-page applications.
  
### Angular Material
- **Angular Material** was used to provide pre-built, customizable UI components such as tables, pagination, form fields, buttons, and progress bars. This ensures a consistent and responsive design with minimal effort.

### RxJS
- **RxJS** is used for handling asynchronous operations and working with observables. It's integral to interacting with the API and managing the state of the data in the application.

### NgModel (Two-way data binding)
- **NgModel** is used for binding data between the input fields (search and filter) and the component class, allowing dynamic updates to the view.

## Setup Instructions

To run the application locally, follow these steps:

## Prerequisites
- Node.js (version 16.x or higher)
- Angular CLI (version 15.x or higher)
- npm (version 8.x or higher)

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jdavid94/pokemon-app.git

2. Navigate to the project directory:
    ```bash
    cd pokemon-app
    ```
3. Install dependencies:
    ```bash
    npm install

## Running the Application
1. Start the Angular development server:
    ```bash
    ng serve
    ```
2. Open your browser and go to:
    ```
    http://localhost:4200

## Assumptions Made
-The Pokémon API (https://pokeapi.co/) is assumed to be publicly available and functioning properly. It provides the necessary data (e.g.,  Pokémon names, types, abilities, etc.).
-The application assumes that each Pokémon object will contain certain properties like id, name, types, and sprites.
-The pagination in the table assumes the API will return the expected number of items based on the limit and offset parameters passed in the API request.
