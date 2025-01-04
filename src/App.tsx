import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold">Vite + React</h1>
    </>
  );
}

export default App;
