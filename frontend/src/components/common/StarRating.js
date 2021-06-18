import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const StarRating = (obj) => {
  const [rating, setrating] = useState(obj.initialRating);
  const [hover, sethover] = useState(null);
  const onRatingChange = async (ratingvalue) => {
    if (obj.ratingtype === "applicant") {
      let obj1 = {};
      obj1.apid = obj.id1;
      obj1.jobId = obj.id2;
      obj1.notRated = obj.initialRating === 0 ? true : false;
      obj1.prevrating = rating;
      obj1.newrating = ratingvalue;
      await axios.post("/api/recruiter/rateapplicant", obj1);
    } else {
      let obj1 = {};
      obj1.apid = obj.id2;
      obj1.jobId = obj.id1;
      obj1.notRated = obj.initialRating === 0 ? true : false;
      obj1.prevrating = rating;
      obj1.newrating = ratingvalue;
      await axios.post("/api/applicant/ratejob", obj1);
    }
  };
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingvalue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingvalue}
              onClick={function () {
                onRatingChange(ratingvalue);
                setrating(ratingvalue);
              }}
            />
            <FaStar
              className="star"
              color={ratingvalue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={20}
              onMouseEnter={() => sethover(ratingvalue)}
              onMouseLeave={() => sethover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
