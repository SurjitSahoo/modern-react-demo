import { useActionDispatch, useStateSelector } from 'globalState';
import { countActions } from 'globalState/count';

export default function SiblingTwo() {
  const { count } = useStateSelector(state => state.count);
  const dispatch = useActionDispatch();

  function decrementBy5() {
    dispatch(countActions.decrementBy(5));
  }

  return (
    <div className='flex-1 ring-1 pt-10'>
      <div className='font-bold mb-5'>Sibling Two</div>
      <h1>
        Current Count: <span className='font-bold text-green-600'>{count}</span>
      </h1>
      <button type='button' onClick={decrementBy5} className='bg-blue-500 text-white rounded px-6 py-1 mt-5'>
        Decrement by 5
      </button>
    </div>
  );
}
