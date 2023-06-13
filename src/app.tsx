import { RootRoutes } from 'routes';
import { Provider } from 'react-redux';
import { store } from 'globalState';
import Header from 'components/header';

function App() {
  return (
    <Provider store={store}>
      <div className='h-screen text-center text-gray-700'>
        <Header />
        <RootRoutes />
      </div>
    </Provider>
  );
}

export default App;
