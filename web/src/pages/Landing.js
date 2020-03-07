import React, { useRef, useState } from "react";
import { notify } from "react-notify-toast";
// import { API_URL } from "../config";
import { Loader } from "../components";
import { constants } from "../constants";

export function Landing(props) {
  const [sendingEmail, setSendingEmail] = useState(false);
  const formRef = useRef();
  const emailRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setSendingEmail(true);
    try {
      // TODO - send a POST to /email
      // await response - if it's valid, we're good
      notify.show(constants.SUCCESS_EMAIL_SUBMISSION, "success");
    } catch (error) {
      notify.show(constants.ERROR_GENERIC, "error");
    } finally {
      // finally reset form for another submission
      formRef.current.reset();
      setSendingEmail(false);
    }
  };

  return (
    <>
      <h1>
        Welcome! Sign up for our amazing service (implementation coming soon)
      </h1>
      <form ref={formRef}>
        <>
          <input name="email" type="email" ref={emailRef} required />
          <label htmlFor="email">Email</label>
        </>
        <>
          <button type="submit" onClick={handleSubmit}>
            {sendingEmail ? <Loader /> : "Submit"}
          </button>
        </>
      </form>
    </>
  );
}
