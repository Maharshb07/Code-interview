import React, { useState, useMemo } from 'react';
import '../style.css';
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

function Rating({ count, rating, color, onRating }) {
    //count = Number of stars
    //rating = Number of stars we rate
    //color = Object containing 2 colors 'filled' 'unfilled'
    //onRating = function that triggers that gives rating when stars are clicked.

    const [hoverRating, setHoverRating] = useState(0);

    const getColor = (index) => {
        if (hoverRating >= index) {
            return color.filled;
        } else if (!hoverRating && rating >= index) {
            return color.filled;
        }

        return color.unfilled;
    };

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <FaStar
                    key={idx}
                    className='starIcon'
                    onClick={() => onRating(idx)}
                    style={{ color: getColor(idx) }}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ));
    }, [count, rating, hoverRating]);

    return <div>{starRating}</div>;
};


//declaring propTypes
Rating.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onRating: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string,
    },
};

//default values for props
Rating.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#f5eb3b",
        unfilled: "#DCDCDC",
    },
};

function FeedbackForm() {
    const [formData, setformData] = useState({
        fname: '',
        lname: '',
        email: '',
        number: '',
        review: ''
    });
    const [rating, setrating] = useState(0);

    const valueTracker = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (!formData.fname || !formData.lname || !formData.email || !formData.number || !formData.review) {
            alert('Fill all fields')
        }
        else {
            alert(JSON.stringify(formData))

        }
    }
    return (
        <>
            <Rating rating={rating} onRating={(rate) => setrating(rate)} />
            <p className="rating italic">{rating} star</p>
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
            <div className="reviewBox">
                <textarea rows="5" name="review" onChange={(e) => valueTracker(e)} className='reviewInput italic' placeholder='Your Review' />
            </div>
            <div className="formActions">
                <button className="submitBtn" onClick={handleSubmit}>Submit</button>
            </div>

        </>
    )
}

function HotelFeedbackForm() {
    return (
        <div className='formContainer'>
            <div className="titleBox">
                <h1 className="title">Hotel Transylvania</h1>
                <p className="formTitle italic">Feedback Form</p>
            </div>
            <div className="feedbackForm">
                <FeedbackForm />
            </div>

        </div>
    );
}

export default HotelFeedbackForm;