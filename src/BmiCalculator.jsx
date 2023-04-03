import React, { useState } from 'react';

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');

  function calculateBMI(e) {
    e.preventDefault();
    const heightInMeters = height / 100;
    const bmiResult = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiResult);
    setHeight("");
    setWeight("");
  }

  function handleClear(){
    setBMI("");
  }

  return (
    <div className='bmi_container'>
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <label> Height (cm): </label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} required/>
         <br /> <br />
        <label>Weight (kg):  </label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} required/>
        <br /> <br />
        <div className='btnContainer'>
        <button type="submit">Calculate BMI</button>
        </div>
      </form>
      <div className='result_container'>
      <button onClick={handleClear}>Refresh</button>
      {bmi && <h2> <span>Your BMI is:</span>  {bmi}</h2>}
      {bmi && bmi<=18.5 && <p>You are UnderWeight</p>}
      {bmi>= 18.5 && bmi<=24.9 && <p>You have Normal weight</p>}
      {bmi>=25 && bmi<=29.9 && <p>You are OverWeight</p>}
      {bmi>=30 && <p>You are having Obesity</p>}
      </div>
    </div>
  );
}

export default BMICalculator;



