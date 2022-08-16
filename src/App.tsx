import './App.css';
import {
  getChargeableValues,
  ESTIMATED_TOTAL_COST,
  FEE_PERCENTAGES,
} from './Fee Percentages';
import { formatNumber, showPercentages, sumArrayOfNumbers } from './utils';
import { useEffect, useState } from 'react';

function App() {
  const [estimatedTotalCost, setEstimatedTotalCost] =
    useState(ESTIMATED_TOTAL_COST);
  const [chargeableValues, setChargeableValues] = useState<number[]>([]);

  useEffect(() => {
    setChargeableValues(getChargeableValues(estimatedTotalCost));
  }, [estimatedTotalCost]);

  const getTotalFees = (array: number[]) => {
    return sumArrayOfNumbers(
      chargeableValues.map((value, index) => {
        return value * array[index];
      })
    );
  };

  const feePercentagesArray = Object.keys(FEE_PERCENTAGES);

  const deriveFinalTotal = () => {
    return sumArrayOfNumbers(
      feePercentagesArray.map((feePercentage) => {
        return getTotalFees(
          FEE_PERCENTAGES[feePercentage as keyof typeof FEE_PERCENTAGES]
        );
      })
    );
  };

  const deriveValues = (title: string, array: number[]) => {
    const totalFees = getTotalFees(array);

    return (
      <div className="App-body" key={title}>
        <h1>{title}</h1>

        {chargeableValues.map((value, index) => {
          const balText =
            index === chargeableValues.length - 1
              ? 'BAL'
              : index === 0
              ? 'FIRST'
              : 'NEXT';

          return (
            <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
              <p style={{ flex: 1 }}>{balText}</p>
              <p style={{ flex: 1 }}>{formatNumber(value)}</p>
              <p style={{ flex: 1 }}>{showPercentages(array[index] * 100)}%</p>
              <p style={{ flex: 1 }}>{formatNumber(value * array[index])}</p>
            </div>
          );
        })}

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ flex: 1 }} />
          <p style={{ flex: 1 }} />
          <p className="Total-text" style={{ flex: 1, fontWeight: 'bold' }}>
            TOTAL
          </p>
          <p className="Total-text" style={{ flex: 1, fontWeight: 'bold' }}>
            {formatNumber(totalFees)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div
        className="Input-body"
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        <p className="Input-text" style={{ marginRight: '3vw' }}>
          Enter a cost estimate
        </p>
        <input
          placeholder="Enter a cost estimate"
          className="Input-text"
          style={{ flex: 1, height: 50 }}
          value={estimatedTotalCost}
          onChange={(e) =>
            setEstimatedTotalCost(e.target.value as unknown as number)
          }
        />
      </div>

      {feePercentagesArray.map((key) => {
        const title = key.split('_').join(' ');

        return deriveValues(
          title,
          FEE_PERCENTAGES[key as keyof typeof FEE_PERCENTAGES]
        );
      })}

      <div className="App-body">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ flex: 1 }} />
          <p style={{ flex: 1 }} />
          <p className="Total-text-final" style={{ flex: 1 }}>
            FINAL TOTAL
          </p>
          <p className="Total-text-final" style={{ flex: 1 }}>
            {formatNumber(deriveFinalTotal())}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
