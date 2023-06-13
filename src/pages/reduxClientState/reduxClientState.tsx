import SiblingOne from './components/siblingOne';
import SiblingTwo from './components/siblingTwo';

export default function ReduxClientStateDemo() {
  return (
    <div className='flex flex-row h-[calc(100vh-2rem)]'>
      <SiblingOne /> <SiblingTwo />
    </div>
  );
}
