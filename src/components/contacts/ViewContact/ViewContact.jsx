import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";
import "./viewcontact.css"

const ViewContact = () => {
  const { contactId } = useParams();
  const [state, setState] = useState({
    loading: false,
    contact: null,
    errorMessage: "",
    group: {},
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroup(response.data);
        setState({
          contact: response.data,
          loading: false,
          group: groupResponse.data,
        });
      } catch (err) {
        setState({
          contact: null,
          loading: false,
          errorMessage: err.message,
        });
      }
    };

    fetchContact();
  }, [contactId]); // Adding contactId as a dependency to re-fetch if it changes

  const { contact, loading, errorMessage, group } = state;

  return (
    <>
      <section className="view-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                viverra risus sit amet justo blandit, ut gravida erat convallis.
                Sed in orci euismod, consequat ligula sit amet.
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : errorMessage ? (
        <div className="container mt-3">
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        </div>
      ) : (
        contact &&
        group && (
          <section className="view-contactt mt-3">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  {contact.photo && (
                    <img
                      src={contact.photo}
                      className="contact-img"
                      alt="Contact"
                     
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                      Name: <span className="fw-bold">{contact.name}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Mobile: <span className="fw-bold">{contact.mobile}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Email: <span className="fw-bold">{contact.email}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Company:{" "}
                      <span className="fw-bold">{contact.company}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Title: <span className="fw-bold">{contact.title}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Group: <span className="fw-bold">{group.name}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <Link to={"/contacts/list"} className="btn btn-warning">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default ViewContact;
