import { RootRoutes } from 'routes';
import Header from 'components/header';
import { GlobalStateProvider } from 'globalState';

function App() {
  return (
    <GlobalStateProvider>
      <div className='h-screen text-center text-gray-700'>
        <Header />
        <RootRoutes />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
