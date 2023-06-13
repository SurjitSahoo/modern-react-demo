import { useActionDispatch, useStateSelector } from 'globalState';
import { countActions } from 'globalState/count';

export default function SiblingOne() {
  const { count } = useStateSelector(state => state.count);
  const dispatch = useActionDispatch();

  function incrementBy5() {
    dispatch(countActions.incrementBy(5));
  }

  return (
    <div className='flex-1 ring-1 pt-10'>
      <div className='font-bold mb-5'>Sibling One</div>
      <h1>
        Current Count: <span className='font-bold text-green-600'>{count}</span>
      </h1>
      <button type='button' onClick={incrementBy5} className='bg-blue-500 text-white rounded px-6 py-1 mt-5'>
        Increment by 5
      </button>
    </div>
  );
}
