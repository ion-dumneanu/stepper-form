import logo from './logo.svg';
import './App.css';
import DynamicForm from './DynamicRouterForm.js';
import Home from './Home.js';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import SteperForm from './components/SteperForm';
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
    { path: "/form", element: <DynamicForm />, action: formAction },
    { path: "/stepper", element: <SteperForm /> },
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