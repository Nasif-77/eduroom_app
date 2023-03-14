import './App.css';
import { RouterProvider } from 'react-router-dom'
import { browserRouter } from './Route/router';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  
  
  return (
      <RouterProvider router={browserRouter} />
  );
}

export default App;
