import React, { useRef, useState } from "react";
import { notify } from "react-notify-toast";
import { API_URL } from "../config";
import { Loader } from "../components";

export function Landing(props) {
  const [sendingEmail, setSendingEmail] = useState(false);
  const formRef = useRef();
  const emailRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setSendingEmail(true);
    try {
      // send a POST to /email
      // await response - if it's valid, we're good
      // toast a success
      notify.show('success!', 'success')
    } catch (error) {
      // if the server sends an error
      // toast an error
      notify.show('oh no!!', 'error')
    } finally {
      // finally reset form for another submission
      setTimeout(() =>
      {formRef.current.reset()
      setSendingEmail(false)}, 2000);
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
