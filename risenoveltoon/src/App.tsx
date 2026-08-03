import RouterSetting from "./routes/routerList.tsx"
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (

      <BrowserRouter>
        <RouterSetting/>
      </BrowserRouter>
  );
}

export default App;