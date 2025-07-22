// Main App component
// Note: Navbar is available globally because we loaded it in index.html before this file
const App = () => {
  return (
    <div className="app">
      <main>
        <h1>Welcome to React!</h1>
        <p>This is a demonstration of components in React</p>
        <div className="content">
          <h2>Why React?</h2>
          <ul>
            <li>Component-Based Architecture</li>
            <li>Reusable Code</li>
            <li>Efficient DOM Updates</li>
            <li>Rich Ecosystem</li>
          </ul>
        </div>
      </main>
      <footer>
        <p>© 2025 React Demo</p>
      </footer>
    </div>
  );
};
