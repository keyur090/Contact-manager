import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";

const AddContact = () => {
  let navigate = useNavigate();
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
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: true });
    }
  };

  // Function to fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        let response = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data,
        });
      } catch (err) {
        setState({
          ...state,
          loading: false,
          errorMessage: err.message,
        });
      }
    };

    fetchGroups();
  }, []);

  const { contact, groups, errorMessage, loading } = state;

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
                  <p className="h4 text-success fw-bold">Create Contact</p>
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
              <div className="row">
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
                        {groups.length > 0 &&
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
                        className="btn btn-success"
                        value="Create"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark m-2">
                        Cencel
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

export default AddContact;
