
# Artwork Data Table

## Description

This TypeScript React application, developed for GrowMeOrganic, presents an interactive data table of artworks using the PrimeReact library. It features pagination, multi-row selection, and a loading state. Data is fetched from the Art Institute of Chicago's API, offering a dynamic interface for browsing and selecting artworks.

## Features

- **Pagination**: Easily navigate through pages of artwork data.
- **Multi-Row Selection**: Select multiple rows with selections persisting across page changes.
- **Loading Spinner**: Displays a spinner while data is being loaded.
- **Dynamic Row Selection**: An overlay panel allows for selecting a specified number of rows across pages.

## Technologies

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript for improved development experience.
- **PrimeReact**: UI component library providing advanced and customizable components.
- **PrimeIcons**: Icon library used with PrimeReact components.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/bsingh6636/Artwork-Data-Table.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd Artwork-Data-Table
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Start the Development Server:**

   ```bash
   npm start
   ```

   The application will be available at [http://localhost:5174](http://localhost:5174).

## Usage

- **Viewing Artworks**: The main data table displays artwork details including title, place of origin, artist, inscriptions, and date ranges.
- **Selecting Rows**: Use checkboxes to select individual rows and the overlay panel to select multiple rows across pages.

## Project Structure

- **`src/`**: Contains the main application code.
  - **`components/`**: Reusable React components.
  - **`App.tsx`**: Main component handling data fetching, pagination, and row selection.

- **`public/`**: Contains static assets.

- **`package.json`**: Project metadata and dependencies.

- **`tsconfig.json`**: TypeScript configuration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

If you would like to contribute to this project:

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes and push to the new branch.
4. Open a pull request with a description of your changes.

## Contact

For any questions or feedback, please contact [Brijesh Kumar Kushwaha](mailto:bsingh6636@outlook.com).

---
