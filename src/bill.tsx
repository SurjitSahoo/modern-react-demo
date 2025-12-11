import { useState, useEffect, useRef } from 'react';
import JSPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from './assets/logo.png';
import sbi from './assets/sbi.svg';
import PaperBackground from './PaperBackground';

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

type BillDetails = typeof sampleBill;

function Bill({ billDetails = sampleBill }: { billDetails?: BillDetails }) {
  return (
    <div className='w-[340px] px-6 py-8 relative bg-white'>
      <PaperBackground />
      {/* Top Left */}
      <div
        className='absolute top-0 left-0 flex flex-row items-center gap-1 origin-top-left'
        style={{ transform: 'rotate(90deg) translateY(-100%)', left: '100%', width: 'max-content', zIndex: 10 }}
      />

      {/* Corner Labels (Rotated) */}
      <div
        className='absolute top-0 left-8 flex items-center gap-1 origin-top-left'
        style={{ transform: 'rotate(90deg)', width: 'max-content', zIndex: 10 }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform -rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>

      <div
        className='absolute top-80 left-8 flex items-center gap-1 origin-top-left'
        style={{ transform: 'rotate(90deg)', width: 'max-content', zIndex: 10 }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform -rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>

      <div
        className='absolute top-0 right-8 flex items-center gap-1 origin-top-right'
        style={{ transform: 'rotate(-90deg)', width: 'max-content', zIndex: 10 }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform -rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>

      <div
        className='absolute top-80 right-8 flex items-center gap-1 origin-top-right'
        style={{ transform: 'rotate(-90deg)', width: 'max-content', zIndex: 10 }}>
        <div className='flex flex-row items-center gap-[2px]'>
          <img src={sbi} alt='SBI' className='h-5 w-5 transform -rotate-90' />
          <div className='font-semibold text-indigo-900 text-2xl'>SBI</div>
        </div>
        <div className='text-indigo-900 text-2xl'>Payments</div>
      </div>

      <img src={logo} alt='logo' className='w-28 mx-auto relative z-10' />
      <div className='font-mono relative z-10'>
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

// Helper: Format date (dd/mm/yy)
const formatDate = (date: Date) => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear().toString().slice(-2);
  return `${d}/${m}/${y}`;
};

// Helper: Format time (hh:mm:ss)
const formatTime = (date: Date) => {
  return date.toTimeString().split(' ')[0];
};

// Helper: Generate strict 15-digit Transaction ID
// Format: 10 zeros + 5 random digits (10000-99999)
const generateTransactionId = () => {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `0000000000${randomSuffix}`;
};

// Hook for smooth progress animation
const useSmoothProgress = (value: number) => {
  const [displayValue, setDisplayValue] = useState(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setDisplayValue(prev => {
        const diff = value - prev;
        // If close enough, snap to target
        if (Math.abs(diff) < 0.5) return value;
        // Ease towards target (adjust divisor for speed)
        return prev + diff * 0.1;
      });
      if (displayValue !== value) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [value, displayValue]);

  return displayValue;
};

export default function BillGenerator() {
  const [bill, setBill] = useState(sampleBill);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Series Mode State
  const [isSeriesMode, setIsSeriesMode] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [targetTotal, setTargetTotal] = useState(0);
  const [minTrans, setMinTrans] = useState(50);
  const [maxTrans, setMaxTrans] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seriesBills, setSeriesBills] = useState<BillDetails[]>([]);
  const [shouldPrintSeries, setShouldPrintSeries] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);

  // Smooth usage
  const smoothProgress = useSmoothProgress(generateProgress);

  const generateSingleBillDetails = (specificAmount: number, specificDate: Date) => {
    const newBill = structuredClone(sampleBill);
    newBill[amtIdx].value = `Rs. ${specificAmount}`;
    newBill[saleIdx].value = `Rs. ${specificAmount}`;
    newBill[volIdx].value = `${(specificAmount / rate).toFixed(2)}L`;

    newBill[dateIdx].value = formatDate(specificDate);
    newBill[timeIdx].value = formatTime(specificDate);

    newBill[billIdx].value = `${Math.floor(Math.random() * 1000000)}-ORGNL`;
    newBill[transactionIdx].value = generateTransactionId();

    return newBill;
  };

  const generateBill = () => {
    const newBill = structuredClone(bill);
    newBill[amtIdx].value = `Rs. ${amount}`;
    newBill[saleIdx].value = `Rs. ${amount}`;
    newBill[volIdx].value = `${(amount / rate).toFixed(2)}L`;
    newBill[dateIdx].value = date;
    newBill[timeIdx].value = time;
    newBill[billIdx].value = `${Math.floor(Math.random() * 1000000)}-ORGNL`;
    newBill[transactionIdx].value = generateTransactionId();
    setBill(newBill);
  };

  const generateSeries = async () => {
    if (!startDate || !endDate || !targetTotal || !maxTrans) {
      // eslint-disable-next-line no-alert
      alert('Please fill all required fields');
      return;
    }

    setIsGenerating(true);
    setGenerateProgress(0);

    const start = new Date(startDate);
    const end = new Date(endDate);
    const amounts: number[] = [];
    let currentSum = 0;

    // Generate amounts
    while (currentSum < targetTotal) {
      let val = Math.floor(Math.random() * (maxTrans - minTrans + 1)) + minTrans;
      // Round to nearest 50
      val = Math.ceil(val / 50) * 50;

      // Ensure we don't exceed maxTrans after rounding
      if (val > maxTrans) val = maxTrans;
      if (val < minTrans) val = Math.ceil(minTrans / 50) * 50;

      amounts.push(val);
      currentSum += val;
    }

    // Generate dates
    const totalBills = amounts.length;
    const timeSpan = end.getTime() - start.getTime();
    if (timeSpan <= 0) {
      // eslint-disable-next-line no-alert
      alert('End date must be after start date');
      setIsGenerating(false);
      return;
    }

    const avgInterval = timeSpan / totalBills;
    const dates: Date[] = [];

    for (let i = 0; i < totalBills; i += 1) {
      // Evenly spread with some jitter
      const segmentStart = start.getTime() + i * avgInterval;
      const segmentEnd = start.getTime() + (i + 1) * avgInterval;
      const randomTime = segmentStart + Math.random() * (segmentEnd - segmentStart);
      dates.push(new Date(randomTime));
    }
    dates.sort((a, b) => a.getTime() - b.getTime());

    setSeriesBills(dates.map((d, i) => generateSingleBillDetails(amounts[i], d)));
    setShouldPrintSeries(true);
    // Progress handled in effect
    setGenerateProgress(10);
  };

  // Effect to capture PDF when series produced
  useEffect(() => {
    if (shouldPrintSeries && seriesBills.length > 0) {
      const generatePdf = async () => {
        // eslint-disable-next-line new-cap
        let pdf: JSPDF | null = null;
        const container = document.getElementById('series-container');
        if (container) {
          const bills = container.children;
          // eslint-disable-next-line no-restricted-syntax
          for (let i = 0; i < bills.length; i += 1) {
            // Update progress
            setGenerateProgress(10 + Math.floor((i / bills.length) * 90));
            // Yield to UI
            // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
            await new Promise(r => setTimeout(r, 0));

            // eslint-disable-next-line no-await-in-loop
            const canvas = await html2canvas(bills[i] as HTMLElement, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');

            // Convert px to mm for PDF sizing (approx 1px = 0.264583mm)
            // Canvas scale 2 means dims are 2x, so we divide by 2 for print size.
            const mmWidth = (canvas.width / 2) * 0.264583;
            const mmHeight = (canvas.height / 2) * 0.264583;

            if (i === 0) {
              // eslint-disable-next-line new-cap
              pdf = new JSPDF({
                orientation: mmWidth > mmHeight ? 'l' : 'p',
                unit: 'mm',
                format: [mmWidth + 20, mmHeight + 20], // 20mm padding for wiggle room
              });
            } else {
              pdf?.addPage([mmWidth + 20, mmHeight + 20]);
            }

            // Random position within the 20mm extra space
            // Valid range: 1mm to 19mm (leaving 1mm margin minimum)
            const x = 1 + Math.random() * 18;
            const y = 1 + Math.random() * 18;

            // Center image (1mm margin)
            pdf?.addImage(imgData, 'PNG', x, y, mmWidth, mmHeight);
          }
          pdf?.save(`fuel-bills-series-${Date.now()}.pdf`);
        }
        setShouldPrintSeries(false);
        setIsGenerating(false);
        setGenerateProgress(0);
      };
      // Small timeout to ensure render
      setTimeout(generatePdf, 1000);
    }
  }, [shouldPrintSeries, seriesBills]);

  return (
    <div className='p-4 flex flex-row gap-4'>
      <div className='flex flex-col gap-4 w-64'>
        <div className='flex flex-row gap-2 items-center mb-2'>
          <span className='font-bold'>Mode:</span>
          <div id='mode-toggle' className='flex gap-2'>
            <button
              type='button'
              className={`px-2 py-1 rounded ${!isSeriesMode ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setIsSeriesMode(false)}>
              Single
            </button>
            <button
              type='button'
              className={`px-2 py-1 rounded ${isSeriesMode ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setIsSeriesMode(true)}>
              Series
            </button>
          </div>
        </div>

        {!isSeriesMode ? (
          <>
            <input
              type='number'
              placeholder='Amount'
              className='border-2 rounded-lg p-2 w-full'
              onChange={e => setAmount(e.target.valueAsNumber)}
            />
            <input
              type='datetime-local'
              className='border-2 rounded-lg p-2 w-full'
              onChange={e => {
                let [newDate, newTime] = e.target.value.split('T');
                newDate = newDate.split('-').reverse().join('/');
                newTime = `${newTime}:${new Date().getSeconds()}`;

                // check if newTime is 'undefined:NaN' if format is incomplete
                if (newTime.includes('undefined')) newTime = '';

                setDate(newDate);
                setTime(newTime);
              }}
            />

            <button type='button' className='rounded-lg bg-slate-700 text-white px-4 py-2' onClick={generateBill}>
              Generate New
            </button>
          </>
        ) : (
          <>
            <div className='flex flex-col gap-1'>
              <div className='text-sm font-semibold'>Start Date</div>
              <input
                type='datetime-local'
                className='border-2 rounded-lg p-2 w-full'
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-sm font-semibold'>End Date</div>
              <input
                type='datetime-local'
                className='border-2 rounded-lg p-2 w-full'
                onChange={e => setEndDate(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-sm font-semibold'>Total Amount</div>
              <input
                type='number'
                placeholder='Total Target'
                className='border-2 rounded-lg p-2 w-full'
                onChange={e => setTargetTotal(e.target.valueAsNumber)}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-sm font-semibold'>Min Transaction (Default 50)</div>
              <input
                type='number'
                defaultValue={50}
                className='border-2 rounded-lg p-2 w-full'
                onChange={e => setMinTrans(e.target.valueAsNumber || 50)}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <div className='text-sm font-semibold'>Max Transaction</div>
              <input
                type='number'
                placeholder='Max Amount'
                className='border-2 rounded-lg p-2 w-full'
                onChange={e => setMaxTrans(e.target.valueAsNumber)}
              />
            </div>

            <button
              type='button'
              className='rounded-lg bg-indigo-700 text-white px-4 py-2 disabled:opacity-50'
              onClick={generateSeries}
              disabled={isGenerating}>
              {isGenerating ? `Generating... ${Math.round(smoothProgress)}%` : 'Generate Series & PDF'}
            </button>

            {isGenerating && (
              <div
                className='w-full rounded-full h-2.5 mt-2 border border-gray-200 overflow-hidden'
                style={{ backgroundColor: '#eeeeee' }}>
                <div className='bg-blue-600 h-full rounded-full' style={{ width: `${smoothProgress}%` }} />
              </div>
            )}

            {!isGenerating && seriesBills.length > 0 && (
              <div className='mt-2 p-2 bg-green-100 text-green-800 rounded text-center font-semibold'>
                Total Generated: Rs.{' '}
                {seriesBills.reduce((acc, b) => {
                  const valStr = b[9].value; // amtIdx is 9
                  const val = parseInt(valStr.replace('Rs. ', '').replace(/,/g, ''), 10);
                  return acc + (Number.isNaN(val) ? 0 : val);
                }, 0)}
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Area */}
      <Bill billDetails={bill} />

      {/* Hidden Container for Series PDF Generation */}
      {seriesBills.length > 0 && (
        <div id='series-container' className='absolute top-0 left-0 -z-50 opacity-0 pointer-events-none'>
          {seriesBills.map(b => (
            <div key={b[billIdx].value} className='mb-4 bg-white'>
              <Bill billDetails={b} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
