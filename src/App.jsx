import "./App.css";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-3xl font-bold underline text-center text-green-500">
          Hello dev
        </h1>
        <p className="text-lg text-center">Welcome to the app!</p>
      </div>
      <footer className="text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Shad.dev. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
