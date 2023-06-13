import { useActionDispatch, useStateSelector } from 'globalState';
import { countActions } from 'globalState/count';

export default function SiblingOne() {
  const { count } = useStateSelector(state => state.count);
  const dispatch = useActionDispatch();

  function incrementBy5() {
    dispatch(countActions.incrementBy(5));
  }

  return (
    <div className='flex-1 ring-1'>
      <div className='font-bold'>Sibling One</div>
      <h1>Current Count: {count}</h1>
      <button type='button' onClick={incrementBy5} className='bg-blue-500 text-white rounded px-6 py-1'>
        Increment by 5
      </button>
    </div>
  );
}
