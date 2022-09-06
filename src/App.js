import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './formStyle.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
// import HotelHotelFeedbackForm from './Pages/HotelFeedbackForm';

function Form({ type, setKey, setisDisabled }) {

  //type => to get the form fields with respect to form type
  //setkey => a func which helps to switch between tabs
  //setisDisabled => a func to enable the disabled tab onClick of save button


  const [formData, setformData] = useState({
    fname: '',
    lname: '',
    email: '',
    number: '',
    address: '',
    cardNumber: '',
    cvv: '',
    cardHolderName: ''
  });

  //used to track the value of form fields
  const valueTracker = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  //triggers when "save" or "place order" button is clicked
  const handleSubmit = () => {
    if (type === 'Shipping') {
      if (!formData.fname || !formData.lname || !formData.email || !formData.number || !formData.address) {
        alert('Fill all fields')
      }
      else {
        setKey('payment')
        setisDisabled(false)
      }
    }

    else if (type === 'Payment') {
      if (!formData.cardNumber || !formData.cvv || !formData.cardHolderName) {
        alert('Fill all fields')
      }
      else {
        setKey('confirm')
      }
    }

    else if (type === 'Confirm') {
      alert('Order Placed Successfully.')
    }
  }
  return (
    <div className='formWrapper'>
      {
        type === 'Shipping' && (
          <>
            <div className="nameBox">
              <div className="inputBox">
                <input name='fname' type="text" className="inputField" placeholder='First Name' value={formData.fname} onChange={(e) => valueTracker(e)} />
              </div>
              <div className="inputBox">
                <input name='lname' type="text" className="inputField" placeholder='Last Name' value={formData.lname} onChange={(e) => valueTracker(e)} />
              </div>
            </div>
            <div className="emailBox">
              <div className="inputBox">
                <input name='email' type="email" className="inputField" placeholder='Email' value={formData.email} onChange={(e) => valueTracker(e)} />
              </div>
              <div className="inputBox">
                <input name='number' type="number" className="inputField" placeholder='Contact No.' value={formData.number} onChange={(e) => valueTracker(e)} />
              </div>
            </div>
            <div className="addressBox">
              <textarea rows="5" name="address" value={formData.address} onChange={(e) => valueTracker(e)} className='addressInput italic' placeholder='Address' />
            </div>
          </>

        )
      }
      {type === "Payment" && (
        <>
          <div className="cardNumberBox">
            <div className="inputBox cardNum">
              <input name='cardNumber' type="number" className="inputField" placeholder='Card Number' value={formData.cardNumber} onChange={(e) => valueTracker(e)} />
            </div>
            <div className="inputBox cvv">
              <input name='cvv' type="number" className="inputField" placeholder='CVV' value={formData.cvv} onChange={(e) => valueTracker(e)} />
            </div>
          </div>
          <div className="cardHolderName">
            <div className="inputBox">
              <input name='cardHolderName' type="text" className="inputField" placeholder='Card Holder Name' value={formData.cardHolderName} onChange={(e) => valueTracker(e)} />
            </div>
          </div>
        </>

      )
      }
      {
        type === 'Confirm' && (
          <>
            <p className="italic text-center">Your Details</p>
            <p className='italic text-center grey'>Final info to be shown here</p>

          </>
        )
      }
      <div className="formActions">
        <button className="submitBtn bg-primary" onClick={handleSubmit}>{
          type === 'Confirm' ? 'Place Order' : 'Save'
        }</button>
      </div>
    </div>
  )
}

//declaring propTypes
Form.protoTypes = {
  type: PropTypes.string,
  setKey: PropTypes.func,
  setisDisabled: PropTypes.func
}

function FormTabs() {
  const [key, setKey] = useState('shipping');
  const [isDisabled, setisDisabled] = useState(true);
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="shipping" title="Shipping Info">
        <Form setKey={setKey} type='Shipping' setisDisabled={setisDisabled} />
      </Tab>
      <Tab eventKey="payment" title="Payment Info" disabled={isDisabled}>
        <Form setKey={setKey} type='Payment' />
      </Tab>
      <Tab eventKey="confirm" title="Confirmation" disabled >
        <Form setKey={setKey} type='Confirm' />
      </Tab>
    </Tabs>
  );
}

function App() {
  return (
    <>
      <div className="formCardContainer">
        <Card className='formCard'>
          <Card.Body>
            <FormTabs />
          </Card.Body>
        </Card>
      </div>
      {/* <HotelHotelFeedbackForm /> */}
    </>


  );
}

export default App;
