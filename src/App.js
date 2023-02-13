import './App.css';
import { RouterProvider } from 'react-router-dom'
import { browserRouter } from './Route/router';



function App() {
  
  
  return (
      <RouterProvider router={browserRouter} />
  );
}

export default App;
