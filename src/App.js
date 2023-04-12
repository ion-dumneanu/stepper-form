import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Home.js';
import WizzardForm from './components/WizzardForm';

const formAction = async ({ request, response }) => {
  console.log(request);

  const elementsOfForm = await request.formData();
  console.log('Thiws is the request element of form: ', elementsOfForm.get('name'));

  return null;
}

const router = createBrowserRouter(
  [
    { path: "/", element: <Home />, action: formAction },
    { path: "/wizzard", element: <WizzardForm /> }
  ]
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;