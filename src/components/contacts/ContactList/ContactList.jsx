import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";
import "./contactlist.css";

const ContactList = () => {
  const [query, setQuery] = useState({
    text: "",
  });
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filterdContacts: [],
    errorMessage: "",
  });

  const searchContacts = (event) => {
    setQuery({
      ...query,
      text: event.target.value,
    });
    const Contacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filterdContacts: Contacts,
    });
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const response = await ContactService.getAllContacts();
        setState({
          contacts: response.data,
          filterdContacts: response.data,
          loading: false,
          errorMessage: "", // Clear error message on successful fetch
        });
      } catch (err) {
        setState({
          contacts: [],
          loading: false,
          errorMessage: err.message,
        });
      }
    };

    fetchContacts();
  }, []);

  const clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filterdContacts: response.data,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };

  const { loading, errorMessage, filterdContacts } = state;

  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col my-2">
                <p className="h3">
                  Contact Manager
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2"></i>New
                  </Link>
                </p>
                <p className="fst-italic font-mono">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque viverra risus sit amet justo blandit, ut gravida erat
                  convallis. Sed in orci euismod, consequat ligula sit amet.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        type="text"
                        className="form-control"
                        placeholder="Search Names"
                        // style={{ width: '30vw' }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
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
        <section className="contact-list p-15">
          <div className="container">
            <div className="row">
              {filterdContacts.length > 0 ? (
                filterdContacts.map((contact) => (
                  <div className="col-md-6" key={contact.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center flex justify-around">
                          <div className="col-md-3">
                            <img
                              src={contact.photo}
                              alt="Contact"
                              className="rounded-circle"
                            />
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Name:{" "}
                                <span className="fw-bold">{contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Mobile:{" "}
                                <span className="fw-bold">
                                  {contact.mobile}
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Email:{" "}
                                <span className="fw-bold">{contact.email}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="icons col-md-1 d-flex flex-col align-items-center">
                            <Link
                              to={`/contacts/view/${contact.id}`}
                              className="btn btn-warning my-1"
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link
                              to={`/contacts/edit/${contact.id}`}
                              className="btn btn-primary my-1"
                            >
                              <i className="fa fa-pen"></i>
                            </Link>
                            <button
                              onClick={() => clickDelete(contact.id)}
                              className="btn btn-danger my-1"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center mt-3">
                  <p>No contacts found.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactList;
