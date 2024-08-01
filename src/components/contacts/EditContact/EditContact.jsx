import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";
import "./editcontact.css";

const EditContact = () => {
  let { contactId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setState({
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
          errorMessage: "",
        });
      } catch (error) {
        setState({
          loading: false,
          contact: null,
          group: null,
          errorMessage: error.message,
        });
      }
    };

    fetchData();
  }, [contactId]);

  const updateValue = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { contact, loading, errorMessage, groups } = state;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque viverra risus sit amet justo blandit, ut gravida
                    erat convallis. Sed in orci euismod, consequat ligula sit
                    amet.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <div className="row align-items-center">
              <div className="col-md-3">
                  <img
                    src={contact.photo}
                    alt=""
                    className="contact-img"
                  ></img>
                </div>
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="name"
                        value={contact.name}
                        onChange={updateValue}
                        required={true}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        value={contact.photo}
                        onChange={updateValue}
                        required={true}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateValue}
                        required={true}
                        type="mobile"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        value={contact.email}
                        onChange={updateValue}
                        required={true}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="company"
                        value={contact.company}
                        onChange={updateValue}
                        required={true}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="title"
                        value={contact.title}
                        onChange={updateValue}
                        required={true}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="groupId"
                        value={contact.groupId}
                        onChange={updateValue}
                        required={true}
                        className="form-control"
                      >
                        <option value="">Select a group</option>
                        {groups &&
                          groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark m-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
