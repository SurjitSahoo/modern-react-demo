import { useState } from 'react';
import logo from './assets/logo.png';
import sbi from './assets/sbi.svg';

const sampleBill = [
  {
    option: 'Bill No',
    value: '544249-ORGNL',
  },
  {
    option: 'Trns. ID',
    value: '0000000000947',
  },
  {
    option: 'Atnd. ID',
    value: '',
  },
  {
    option: 'Date',
    value: '19/11/24',
  },
  {
    option: 'Time',
    value: '03:20:28',
  },
  {
    option: 'FP. ID',
    value: '2',
  },
  {
    option: 'Nozl No',
    value: '2',
  },
  {
    option: 'Fuel',
    value: 'XP95',
  },
  {
    option: 'Density',
    value: '7501kg/m3',
  },
  {
    option: 'Preset',
    value: 'Rs. 300',
  },
  {
    option: 'Rate',
    value: 'Rs. 109.17',
  },
  {
    option: 'Sale',
    value: 'Rs. 300.00',
  },
  {
    option: 'Volume',
    value: '2.74L',
  },
];

const rate = 109.17;

const billIdx = 0;
const transactionIdx = 1;
const dateIdx = 3;
const timeIdx = 4;
const amtIdx = 9;
const saleIdx = 11;
const volIdx = 12;

function Bill({ billDetails = sampleBill }) {
  return (
    <div className='max-w-max px-6 py-8 overflow-hidden relative'>
      <div
        className='mb-5 flex flex-row gap-1 absolute top-0 left-0'
        style={{ writingMode: 'vertical-rl', textOrientation: 'sideways' }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>
      <div
        className='mb-5 flex flex-row gap-1 absolute top-80 left-0'
        style={{ writingMode: 'vertical-rl', textOrientation: 'sideways' }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>
      <div
        className='mb-5 flex flex-row gap-1 absolute top-0 right-0 transform rotate-180'
        style={{ writingMode: 'vertical-rl', textOrientation: 'sideways' }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>
      <div
        className='mb-5 flex flex-row gap-1 absolute top-80 right-0 transform rotate-180'
        style={{ writingMode: 'vertical-rl', textOrientation: 'sideways' }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>

      <img src={logo} alt='logo' className='w-28 mx-auto' />
      <div className='font-mono'>
        <div className='mb-8'>
          <div>MS PRATIK KSK</div>
          <div>RAIBOGA</div>
        </div>
        <div className='table'>
          {billDetails.map(billDetail => (
            <div className='table-row' key={billDetail.option}>
              <div className='table-cell'>{billDetail.option}</div>
              <div className='table-cell'>: {billDetail.value}</div>
            </div>
          ))}
        </div>
        <div>THANK YOU</div>
      </div>
    </div>
  );
}

export default function BillGenerator() {
  const [bill, setBill] = useState(sampleBill);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const generateBill = () => {
    const newBill = structuredClone(bill);
    newBill[amtIdx].value = `Rs. ${amount}`;
    newBill[saleIdx].value = `Rs. ${amount}`;
    newBill[volIdx].value = `${(amount / rate).toFixed(2)}L`;
    newBill[dateIdx].value = date;
    newBill[timeIdx].value = time;
    newBill[billIdx].value = `${Math.floor(Math.random() * 1000000)}-ORGNL`;
    newBill[transactionIdx].value = `${sampleBill[transactionIdx].value}${Math.floor(Math.random() * 1000)}`;
    setBill(newBill);
  };

  return (
    <div className='p-4 flex flex-row gap-4'>
      <div className='flex flex-col gap-4'>
        <input
          type='number'
          placeholder='Amount'
          className='border-2 rounded-lg p-2 w-48'
          onChange={e => setAmount(e.target.valueAsNumber)}
        />
        <input
          type='datetime-local'
          className='border-2 rounded-lg p-2 w-48'
          onChange={e => {
            let [newDate, newTime] = e.target.value.split('T');
            newDate = newDate.split('-').reverse().join('/');
            newTime = `${newTime}:${new Date().getSeconds()}`;
            setDate(newDate);
            setTime(newTime);
          }}
        />

        <button type='button' className='rounded-lg bg-slate-700 text-white px-4 py-2' onClick={generateBill}>
          Generate New
        </button>
      </div>
      <Bill billDetails={bill} />
    </div>
  );
}
