import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';



export class AddCityModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/city', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({              
                CityName:event.target.CityName.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add City
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlI="CityName">
                                        <Form.Label>CityName</Form.Label>
                                        <Form.Control type="text" name="CityName" required
                                            placeholder="CityName" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add City
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

}