import React , { useState, useContext, useEffect } from "react";
import MyNavbar from "./Navbar";
import {Row, Col, Nav, Container, Dropdown, DropdownButton, Form} from 'react-bootstrap'
import Button from "./Button";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../core/store/Provider";

export default function MyProposals() {

    const navigate = useNavigate()
    const store = useContext(StoreContext);
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        // since the handler function of useEffect can't be async directly
        // we need to define it separately and run it
        const handleEffect = async () => {
          let s = await store.fetchSelf();
          if (store.user.type === 'student'){
            const proposals = await store.getProposals();
            setProposals(proposals);
          }
          if (store.user.type === 'professor'){
            const proposals = await store.getProposalsByTeacherId();
            setProposals(proposals);
          }
        };
        handleEffect();
    }, [store.user.type]);

    return (
        <>
            <MyNavbar></MyNavbar>
            <Container fluid>
                <Row className="justify-content-between thesis-form-section">
                    <Col className="d-flex justify-content-end" lg={{ span: 4, offset: 6 }}>
                        <Button text={'New Proposal'} icon={faPlus} onClick={() => {navigate('/insertProposal')}}></Button>
                    </Col>
                </Row>
                <Row className="border-thesis-div">
                    
                    <Col lg={{span:8, offset:2}}>
                        {
                            proposals.map((e) =>
                                <div key={e.id} className="thesis-section">
                                    <header>
                                        <h2 className="border-thesis-title"><Nav.Link href={`/proposalpage/${e.id}`}>{e.title}</Nav.Link></h2>
                                    </header>
                                    <div >
                                        <div >
                                            <p>{e.description}</p>
                                            <p><a className="border-thesis-view" href={`/proposalpage/${e.id}`}>VIEW PROPOSAL </a></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}
