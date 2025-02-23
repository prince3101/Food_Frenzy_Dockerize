import { useState } from "react";

const Contact_me = () => {
  const [me, setMe] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleUs = (e) => {
    const { name, value } = e.target;

    setMe((prev) => ({ ...prev, [name]: value }));
  };

  const handleContact = (e) => {
    e.preventDefault();
    console.log(me);
  };

  return (
    <>
      <div className="container">
        <div className="main_me">
          <div className="me-text">
            <h2>I am here no problem !</h2>
            <p>Get in touch with us. We are always here to help you.</p>
            <hr></hr>
          </div>
        </div>

        <div className="me-input">
          <div className="message">
            <form onSubmit={handleContact}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                  <div className="firstname">
                    <label className="mt-2">Firstname</label>
                    <input
                      type="text"
                      placeholder="firstname"
                      name="firstName"
                      value={me.firstName}
                      onChange={handleUs}
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                  <div className="lastname">
                    <label className="mt-2">Lastname</label>
                    <input
                      type="text"
                      placeholder="lastname"
                      name="lastName"
                      value={me.lastName}
                      onChange={handleUs}
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                  <div className="email">
                    <label className="mt-2">E-mail</label>
                    <input
                      type="email"
                      placeholder="e-mail"
                      name="email"
                      value={me.email}
                      onChange={handleUs}
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                  <div className="subject">
                    <label className="mt-2">Subject</label>
                    <input
                      type="text"
                      placeholder="subject"
                      name="subject"
                      value={me.subject}
                      onChange={handleUs}
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                  <div className="messageForMe">
                    <label className="mt-2">Message</label>
                    <textarea
                      rows={5}
                      type="text"
                      className="forme"
                      name="message"
                      value={me.message}
                      onChange={handleUs}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button type="submit" className="me-btn mt-4">
                Submit
              </button>
            </form>

            <div className="map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.035922083145!2d72.65646761126415!3d23.059144579061215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e86d9b9afaaf9%3A0x810682e037e85429!2sSilver%20Homes%2C%20Nava%20Naroda%2C%20Ahmedabad%2C%20Gujarat%20382345!5e0!3m2!1sen!2sin!4v1727859468130!5m2!1sen!2sin"></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact_me;
