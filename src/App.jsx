import { useState } from 'react';
import './App.css';

function App() {
  const [collegeInfo, setCollegeInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    student: ''
  });

  const [marks, setMarks] = useState(['']);
  const [result, setResult] = useState('');

  const handleCollegeChange = (e) => {
    const { name, value } = e.target;
    setCollegeInfo({ ...collegeInfo, [name]: value });
  };

  const handleMarksChange = (index, value) => {
    const updatedMarks = [...marks];
    updatedMarks[index] = value;
    setMarks(updatedMarks);
  };

  const addSubject = () => {
    setMarks([...marks, '']);
  };

  const calculateMin = () => {
    const numericMarks = marks.map(Number).filter(m => !isNaN(m));
    if (numericMarks.length > 0) {
      setResult(`Minimum Mark: ${Math.min(...numericMarks)}`);
    } else {
      setResult('Enter valid marks');
    }
  };

  const calculateMax = () => {
    const numericMarks = marks.map(Number).filter(m => !isNaN(m));
    if (numericMarks.length > 0) {
      setResult(`Maximum Mark: ${Math.max(...numericMarks)}`);
    } else {
      setResult('Enter valid marks');
    }
  };

  const calculateMedian = () => {
    const numericMarks = marks.map(Number).filter(m => !isNaN(m)).sort((a, b) => a - b);
    if (numericMarks.length === 0) {
      setResult('Enter valid marks');
      return;
    }
    const mid = Math.floor(numericMarks.length / 2);
    const median =
      numericMarks.length % 2 !== 0
        ? numericMarks[mid]
        : (numericMarks[mid - 1] + numericMarks[mid]) / 2;
    setResult(`Median Mark: ${median}`);
  };

  return (
    <div className="container">
      <h1>SGPA Calculator</h1>

      <div className="form">
        <input type="text" name="name" placeholder="College Name" onChange={handleCollegeChange} />
        <input type="text" name="address" placeholder="College Address" onChange={handleCollegeChange} />
        <input type="text" name="phone" placeholder="College Phone No." onChange={handleCollegeChange} />
        <input type="email" name="email" placeholder="College Email ID" onChange={handleCollegeChange} />
        <input type="text" name="student" placeholder="Your Name" onChange={handleCollegeChange} />

        <h3>Subject Marks:</h3>
        {marks.map((mark, index) => (
          <input
            key={index}
            type="number"
            placeholder={`Subject ${index + 1} Mark`}
            value={mark}
            onChange={(e) => handleMarksChange(index, e.target.value)}
          />
        ))}
        <button onClick={addSubject}>Add Subject</button>

        <div className="buttons">
          <button onClick={calculateMin}>Show Minimum</button>
          <button onClick={calculateMax}>Show Maximum</button>
          <button onClick={calculateMedian}>Show Median</button>
        </div>

        <div className="result">{result}</div>
      </div>
    </div>
  );
}

export default App;
