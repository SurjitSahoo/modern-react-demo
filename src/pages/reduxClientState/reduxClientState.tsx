import SiblingOne from './components/siblingOne';
import SiblingTwo from './components/siblingTwo';

export default function ReduxClientStateDemo() {
  return (
    <div className='flex flex-row h-[calc(100vh-3.5rem)]'>
      <SiblingOne /> <SiblingTwo />
    </div>
  );
}
