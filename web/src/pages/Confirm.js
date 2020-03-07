import React, { useEffect, useState } from "react";
import { Loader } from "../components";
import { API_URL } from "../config";

// todo - make this into a state machine

export function Confirm(props) {
  const [isConfirming, setIsConfirming] = useState(true);

  useEffect(() => {
    const { id } = props.match.params;
    try {
      fetch(`${API_URL}/email/confirm/${id}`)
        .then(res => res.json())
        .then(() => setIsConfirming(false))
        .catch(error => {
          throw new Error(`error`, error);
        });
    } catch (error) {
      console.error(`Something's wrong`, error);
    }
  }, [props.match.params.id]);

  const content = isConfirming ? (
    <Loader />
  ) : (
    <div>
      <p>You're confirmed! Welcome to the party!</p>
      <a href="/">Return Home</a>
    </div>
  );

  return content;
}
