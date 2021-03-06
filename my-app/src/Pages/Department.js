import React,{Component} from 'react';
import dep from "../Pages/images/deps.jpg";
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from '../Models/AddDepModal';
import {EditDepModal} from '../Models/EditDepModal';

export class Department extends Component{
    
        constructor(props){
            super(props);
            this.state={deps:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:5000/api/department')
            .then(response=>response.json())
            .then(data=>{
                this.setState({deps:data});
            });
        }
    
        componentDidMount(){
            this.refreshList();
        }
    
        componentDidUpdate(){
            this.refreshList();
        }
    
        deleteDep(depid){
            if(window.confirm('A jeni i sigurtë?')){
                fetch('http://localhost:5000/api/department/'+depid,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    
        render(){
    
            const {deps, depid, depname}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return (
                <div>
                    <div id="body">
        <h1>Departments</h1>
          <div id="content">
            <img src={dep} alt=""/>
            </div>
            </div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>DepartmentId</th>
                                <th>DepartmentName</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deps.map(dep=>
                                <tr key={dep.DepartmentId}>
                                    <td>{dep.DepartmentId}</td>
                                    <td>{dep.DepartmentName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                depid:dep.DepartmentId,depname:dep.DepartmentName})}>
                                                    Edit
                                                </Button>
    
                                                <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteDep(dep.DepartmentId)}>
                                                    Delete
                                                </Button>
    
                                                <EditDepModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                depid={depid}
                                                depname={depname}/>
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            Add Department
                        </Button>
    
                        <AddDepModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddDepModal>
                    </ButtonToolbar>
                </div>
            )
        }
    }