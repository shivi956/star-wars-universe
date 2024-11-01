<h1>Star Wars Universe</h1>

<a href=https://star-wars-universe-eight.vercel.app/><b>Star Wars Universe Application</b></a>
<p>This application leverages the <a href="https://swapi.dev">Swapi.dev API</a> to fetch and display details about Star Wars characters. Users can search for characters by name, view detailed profiles, add characters to a favorites list, and edit favorites.</p>

<h2>Project Details</h2>

<p>This project is built using <b>Vite + React + TypeScript</b>.</p>
<h3>Steps to Run Locally:</h3>
<pre><code>npm install
npm run dev
</code></pre>

<h2>Explanation</h2>

<h3>Project Structure</h3>
<ul>
  <li><b>.github/workflows</b>: Contains YAML scripts for GitHub Actions to automate deployment to Vercel.</li>
  <li><b>e2e-testing</b>: Includes Cypress configuration and end-to-end tests.</li>
  <li><b>public</b>: Contains public icons.</li>
  <li><b>src</b>: Contains all project-related code:
    <ul>
      <li><b>/api</b>: API-related functions.</li>
      <li><b>/assets</b>: Images used in the project.</li>
      <li><b>/components</b>: Reusable components.</li>
      <li><b>/hooks</b>: Custom hooks.</li>
      <li><b>/layout</b>: Main webpage layout applied across pages.</li>
      <li><b>/store</b>: Redux store for global state management.</li>
      <li><b>/test</b>: Unit and integration tests.</li>
      <li><b>/utils</b>: Helper functions and types.</li>
    </ul>
  </li>
</ul>

<h2>Tech Stack</h2>
<ul>
  <li><b>Build Tool</b>: Vite (chosen for its fast development environment).</li>
  <li><b>Libraries</b>:
    <ul>
      <li>Tailwind CSS for styling</li>
      <li>Lodash</li>
      <li>React Router DOM for navigation</li>
      <li>React Query for API caching</li>
      <li>Redux Toolkit for global state</li>
      <li>ESLint for code quality</li>
      <li>Husky and Commitlint for code quality pushes and good commit messages</li>
      <li>Additional libraries for testing and enhancing development</li>
    </ul>
  </li>
</ul>

<h2>Explanation</h2>

<p>The application loads the <code>&lt;RootLayout /&gt;</code> component initially, and other components are loaded dynamically based on the current URL.</p>

<h3>Application Pages</h3>
<ul>
  <li><b><code>&lt;CharacterList /&gt;</code></b>: Displays characters in clickable cards using the <code>&lt;CharacterCard /&gt;</code> component, which itself leverages a reusable <code>&lt;Card /&gt;</code> component. <i>(URL: '/')</i></li>
  <li><b><code>&lt;CharacterDetails /&gt;</code></b>: Shows details of the selected character with a button to add the character to favorites. This page uses the <code>&lt;CharacterDetailsCard /&gt;</code> component, built on a reusable <code>&lt;Card /&gt;</code> component.</li>
  <li><b><code>&lt;Favourites /&gt;</code></b>: Lists favorite characters in non-interactive cards with edit and remove buttons. Editing opens the <code>&lt;EditCharacterModal /&gt;</code> component.</li>
  <li><b><code>&lt;ErrorPage /&gt;</code></b>: Displays an error page when an invalid URL is accessed.</li>
</ul>

<h3>Data Caching and State Management</h3>
<ul>
  <li><b><code>&lt;CharacterList /&gt;</code></b>: Calls the Swapi.dev API to fetch character data, which is cached for 30 minutes to reduce API calls. This data is also stored in the Redux store, so if a character is already loaded, no additional API call is needed in the <code>&lt;CharacterDetails /&gt;</code> page.</li>
  <li><b><code>&lt;CharacterDetails /&gt;</code></b>: Fetches detailed character information, including starships, films, and homeworld. If accessed directly, it makes the required API calls to retrieve the character and related details.</li>
</ul>

<pre><code>{
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "https://swapi.dev/api/planets/1/",
    "films": [
    	"https://swapi.dev/api/films/2/",
    	"https://swapi.dev/api/films/6/",
    	"https://swapi.dev/api/films/3/",
    	"https://swapi.dev/api/films/1/",
    	"https://swapi.dev/api/films/7/"
    ],
    "species": [
    	"https://swapi.dev/api/species/1/"
    ],
    "vehicles": [
    	"https://swapi.dev/api/vehicles/14/",
    	"https://swapi.dev/api/vehicles/30/"
    ],
    "starships": [
    	"https://swapi.dev/api/starships/12/",
    	"https://swapi.dev/api/starships/22/"
    ],
    "created": "2014-12-09T13:50:51.644000Z",
    "edited": "2014-12-20T21:17:56.891000Z",
    "url": "https://swapi.dev/api/people/1/"
}
</code></pre>

<p>Advantages of using <b>React Query</b>: Caching data with React Query means that if a starship or film is already loaded, it’s reused from the cache when needed for another character, minimizing API calls. Though Redux could store starship and film data, React Query offers the flexibility to adjust cache time dynamically, ensuring up-to-date information.</p>

<p>When a character is marked as a favorite, it is saved to both the favorites store and the browser’s local storage, allowing favorites to persist on page refresh. The favorites store is used across components to maintain updated values.</p>

<h2>Features and Functionalities</h2>

<h3>Favorites and Persistence</h3>
<p>When a character is added to favorites, the data is saved in both the Redux store and the browser’s local storage. This dual storage approach ensures that favorite characters remain available even after a page refresh, providing a seamless user experience. The Redux store keeps the favorite status updated across the application.</p>

<h3>Lazy Loading with Dynamic Routing</h3>
<p>The application uses lazy loading to improve performance by loading components only when they are required. For instance, <code>&lt;CharacterList /&gt;</code> is the default loaded page, while detailed views and favorite pages are loaded only upon navigation to those routes.</p>

<h2>API Caching Strategy</h2>

<p>The application implements an efficient caching strategy with React Query. By setting a cache time of 30 minutes for character data, it minimizes unnecessary API requests, especially since character data remains static. If data were to become dynamic in the future, cache duration could be adjusted accordingly. The caching of related resources such as starships and films also optimizes performance, as these are reused across different characters.</p>

<h2>Technical Advantages</h2>

<ul>
  <li><b>Performance:</b> Using Vite as the build tool, along with lazy loading and API caching, helps to improve load times and reduce server requests.</li>
  <li><b>Reusable Components:</b> Components such as <code>&lt;Card /&gt;</code> and <code>&lt;Modal /&gt;</code> are built to be reusable, making development faster and promoting consistent UI.</li>
  <li><b>Global State Management:</b> The Redux Toolkit provides centralized state management for favorites and character data, enabling easy access and updates across the app.</li>
  <li><b>Responsive UI:</b> Tailwind CSS is used to create a responsive and user-friendly interface.</li>
  <li><b>Accessibility</b> Some accessibility aspects have been taken care of in code which enhances user experience</li>
</ul>

<h2>Testing</h2>

<p>Testing is conducted using Cypress for end-to-end testing to ensure functionality across pages and Jest for unit tests to validate individual components and logic. This setup helps maintain a high standard of quality and catch any potential issues early in development.</p>

<h2>Deployment and CI/CD</h2>

<p>GitHub Actions automate the CI/CD pipeline, facilitating easy and consistent deployment to Vercel. The YAML scripts in <code>.github/workflows</code> handle the build and deployment steps, ensuring that the application is up-to-date with every code change pushed to the main branch.</p>

<h2>Project Enhancements and Future Plans</h2>

<p>In the future, the application may incorporate real-time updates and notifications, where the cache duration for API responses could be shortened. Additional features, like sorting and filtering characters based on various attributes, could also enhance usability. Potential UI improvements could be implemented to further optimize performance on mobile devices.</p>

<p>Furthermore, the architecture is designed with scalability in mind, allowing for easy integration of new features and services as the project grows. This flexibility will support the addition of new character categories, enhanced interactions, or even user-generated content, ensuring that the Star Wars Universe project can evolve to meet user demands while maintaining performance and usability.Also we have pipeline so we can add new code and tests and it will make our app testing also scalable and automated</p>

<p>We look forward to expanding the Star Wars Universe project with more features that immerse users into the world of Star Wars, making it a comprehensive and engaging experience for fans.</p>

<h2>Architecture Diagram</h2>

![Screenshot_1-11-2024_133827_mermaid-js github io](https://github.com/user-attachments/assets/f0c08124-dc68-4111-85e4-c8b124c4f7b8)

<b>Breakdown:</b>
Client Side: Built with Vite + React. Manages user interface and interactions.

Server Side: Uses the SWAPI.dev API to fetch Star Wars data.

<b>Data Management:</b>

React Query handles API calls and caching.

Redux manages global state across components.

Local State handles temporary data within components.

