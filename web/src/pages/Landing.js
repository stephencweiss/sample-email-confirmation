import React, { useRef, useState } from "react";
import { notify } from "react-notify-toast";
import { API_URL } from "../config";
import { Loader } from "../components";
import { constants } from "../constants";

export function Landing() {
  const [sendingEmail, setSendingEmail] = useState(false);

  const formRef = useRef();
  const emailRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    const email = emailRef.current.value;
    setSendingEmail(true);

    try {
      fetch(`${API_URL}/email`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({ email })
      }).then(() => notify.show(constants.SUCCESS_EMAIL_SUBMISSION, "success"));
    } catch (error) {
      notify.show(constants.ERROR_GENERIC, "error");
    } finally {
      formRef.current.reset();
      setSendingEmail(false);
    }
  };

  return (
    <>
      <h1>
        Welcome! Sign up for our amazing service (implementation coming soon)
      </h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            ref={emailRef}
            pattern='^[^@]+@[^@]+\.[^@\.]+\.?[^@\.]*$' // source: https://davidwalsh.name/regular-expressions-rest#comment-506734
            title="Please submit a valid email"
            required
          />
        </>
        <>
          <button type="submit">{sendingEmail ? <Loader /> : "Submit"}</button>
        </>
      </form>
    </>
  );
}
