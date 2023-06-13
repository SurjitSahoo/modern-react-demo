import { RootRoutes } from 'routes';
import { Provider } from 'react-redux';
import { store } from 'globalState';
import Header from 'components/header';
import CompA from 'components/compA/compA';

const myADGroup = 'surjitA';
const BannedADGroups = ['surjit', 'vani'];

function App() {
  return (
    <Provider store={store}>
      <div className='h-screen text-center text-gray-700'>
        <Header />
        <CompA isDisabled={BannedADGroups.includes(myADGroup)} />
        <RootRoutes />
      </div>
    </Provider>
  );
}

export default App;
