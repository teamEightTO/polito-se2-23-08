import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import MyNavbar from "./Navbar";
import {
  Row,
  Col,
  Nav,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
} from "react-bootstrap";
import Button from "./Button";
import {
  faCheck,
  faMagnifyingGlass,
  faX,
  faHand,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import BadButton from "./BadButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../core/store/Provider";

export default function AcceptApplications() {
  //const navigate = useNavigate();
  const param = useParams();
  const proposalId = param.thesisId;
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [proposal, setProposal] = useState([]);
  const [proposalDetails, setProposalDetails] = useState([]);
  const [proposalTitle, setProposalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // since the handler function of useEffect can't be async directly
    // we need to define it separately and run it
    const handleEffect = async () => {
      try {
        const response = await store.getReceivedApplicationsByThesisId(
          proposalId
        );
        setProposal(response);
        const details = proposal.map((p) => p.applicationstatus);
        setProposalDetails(details);
        setProposalTitle(response[0].title);
      } catch (error) {
        navigate("/404");
      }
    };
    handleEffect();
  }, [status]);

  const handleAccept = async (index) => {
    const selectedForm = proposal[index];
    //console.log("Accepted form at index", index, selectedForm.student_id);
    // console.log("test:" , selectedForm.applicationid);
    const response = await store.applicationDecision(
      selectedForm.applicationid,
      "accepted"
    );
    if (response.status !== 200) {
      toast.error(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setStatus("accepted");
      toast.success(
        `You accepted ${selectedForm.student_id} application successfully!`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };

  const handleReject = async (index) => {
    const selectedForm = proposal[index];
    //console.log("Rejected form at index", index, selectedForm);
    const response = await store.applicationDecision(
      selectedForm.applicationid,
      "rejected"
    );
    if (response.status !== 200) {
      toast.error(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setStatus("rejected");
      toast.success(
        `You rejected ${selectedForm.student_id} application successfully!`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };

  return (
    <>
      <MyNavbar />
      <strong>
        <p className=" h2 text-center mt-5 ">{proposalTitle}</p>
      </strong>
      <div>
        {proposal.map((student, index) => (
          <form
            className="container form-proposal mt-3 p-4 rounded shadow mt-10"
            style={{ marginTop: "1px" }}
            key={index}
          >
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Accept</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to accept the application?{" "}
              </Modal.Body>
              <Modal.Footer className="modal-footer d-flex justify-content-end">
                <Button
                  variant="grey"
                  className="mx-2"
                  onClick={() => {
                    setShowModal(false);
                  }}
                  text={"CANCEL"}
                  icon={faHand}
                ></Button>
                <Button
                  variant="success"
                  className="mx-2"
                  onClick={async () => {
                    handleAccept(index)
                    setShowModal(false);
                  }}
                  text={"ACCEPT"}
                  icon={faTrash}
                ></Button>
              </Modal.Footer>
            </Modal>
            <ul>
              <li>
                <strong>Student ID:</strong> {student.student_id},{" "}
                <strong>Application Status:</strong> {student.applicationstatus}
                <div className="row">
                  <div className="col text-start mt-4">
                    {student.applicationstatus === "idle" ? (
                      <BadButton
                        icon={faX}
                        text={"REJECT"}
                        onClick={() => handleReject(index)}
                      ></BadButton>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col text-end mt-4">
                    {student.applicationstatus === "idle" ? (
                      <Button
                        icon={faCheck}
                        text={"ACCEPT"}
                        onClick={() => setShowModal(true)}
                      ></Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </li>
              {/* Add other form fields based on your object properties */}
            </ul>
          </form>
        ))}
      </div>
    </>
  );
}
