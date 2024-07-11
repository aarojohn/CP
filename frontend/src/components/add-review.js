import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useLocation, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddReview = (props) => {
  const location = useLocation();
  const { id } = useParams();

  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  let editing = false;

  useEffect(() => {
    if (location.state && location.state.currentReview) {
      editing = true;
      setReview(location.state.currentReview.review);
    }
  }, [location.state]);

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: id,
    };

    if (editing) {
      // get existing review id
      data.review_id = location.state.currentReview._id;
      MovieDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={"/movies/" + id}>Back to Movie</Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={onChangeReview}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveReview}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddReview;
