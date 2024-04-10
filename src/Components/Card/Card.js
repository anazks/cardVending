import React, { useState, useEffect } from 'react';
import Axios from '../../Axios';
import { firebaseApp } from '../../firebase';
import { getDatabase, ref, set } from 'firebase/database';
import './Card.css';

const Card = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student
  const [showContents, setShowContents] = useState(false);
  const [Value,SetValue]=  useState(1)
  const handleAdmissionNumberChange = (event) => {
    setAdmissionNumber(event.target.value);
  };

  const findStudentByAdmissionNumber = () => {
    Axios.get(`/findStudent?admissionNumber=${admissionNumber}`)
      .then((response) => {
        if (response.data) {
          setSelectedStudent(response.data);
          setShowContents(true); // Show the contents div
        } else {
          setSelectedStudent(null);
          setShowContents(false); 
        }
      })
      .catch((error) => {
        console.error('Error finding student: ', error);
        setSelectedStudent(null);
        setShowContents(false); 
      });
  };

  const generateRandomValue = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const updateFirebaseValue = (id) => {
    console.log(id, '--id');
    const data = {
      id,
    };
    Axios.post('/updatePayment', data)
      .then((response) => {
        if (response.data) {
          console.log('Data updated');
          const database = getDatabase(firebaseApp);
          const valueRef = ref(database, '/room1/L1');
          const randomValue = Value + 1
          SetValue(randomValue)
          set(valueRef, randomValue)
            .then(() => {
              console.log('Value updated successfully');
              openPaymentModal();
            })
            .catch((error) => {
              console.error('Error updating value: ', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error updating data: ', error);
      });
  };

  useEffect(() => {
    try {
      Axios.get('/getstudents').then((response) => {
        if (response) {
          console.log(response);
          setStudents(response.data);
        }
      });
    } catch (error) {
      console.error('Error fetching students: ', error);
    }
  }, []);

  const handleRowClick = (student) => {
    setSelectedStudent(student); 
  };
  const openPaymentModal = (id) => {
    const options = {
      key: 'rzp_test_CTX1puiGnZAbrV', // Replace with your actual Razorpay API key
      amount: 10000, // Amount in paise (e.g., 10000 represents ₹100)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for Service/Product',
      image: 'https://yourwebsite.com/logo.png', // URL of your company logo
      handler: function(response) {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
        updateFirebaseValue(id)
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className='Card-Container'>
      <div className='items student'>
        <div className='Student-input'>
          <h3>Search Student</h3>
          <input
            type='text'
            value={admissionNumber}
            onChange={handleAdmissionNumberChange}
            placeholder='Admission Number'
          />
    
          <button onClick={findStudentByAdmissionNumber}>Search</button>
        </div>
      </div>

      {/* Render the Contents div only if selectedStudent is not null */}
      {selectedStudent && (
        <div className={`items ${showContents ? 'slide-in' : ''}`}>
          <div className='Contents'>
            <h3>Details</h3>
            <table>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{selectedStudent.name}</td>
                </tr>
                <tr>
                  <th>Sem:</th>
                  <td>{selectedStudent.sem}</td>
                </tr>
                <tr>
                  <th>Department:</th>
                  <td>{selectedStudent.batch}</td>
                </tr>
                <tr>
                  <th>Payment Status:</th>
                  <td>{selectedStudent.status}</td>
                </tr>
              </tbody>
            </table>
            <br />
            {/* Pay Now button */}
            <button
              onClick={() => openPaymentModal(selectedStudent._id)}
              className='print'
            >
              Pay Now
            </button>
            <button type='' className='cancel'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;