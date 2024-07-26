import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

class App extends Component {
  constructor(props){
    super(props);

    //สร้าง state for keeping data todo
    this.state = {
      newUserInput: "",
      list: []
    };
  }

  //สร้าง user เพื่อเก็บข้อมูลจาก input
  updateInput(value){
    this.setState({
      newUserInput: value,
    });
  } 

  //สร้าง Note เพื่อเก็บข้อมูลจาก input
  addNewItem(){
    if(this.state.newUserInput !== ""){
      const newUserInput = {
        //Add a random id which is used to delete the item
        id: Math.random(),

        //Add a newInput from the input
        value: this.state.newUserInput,
      };

      //สำหรับอัพเดท list ใหม่
      const list = [...this.state.list];
      list.push(newUserInput);

      //สำหรับต้องการแก้ไขข้อมูลใน list
      this.setState({
        list,
        newUserInput: "",
      });
    }
  }

  //สร้าง deleteItem เพื่อลบข้อมูล
  deleteItemList(key){
    const list = [...this.state.list];

    //สร้าง filter ค้นหาจากข้อมูล id เพื่อลบข้อมูล 
    const updatedList = list.filter((item) => item.id !== key);

    //สำหรับอัพเดท list ใหม่ใน state
    this.setState({
      list: updatedList,
    });
  }

  //สร้าง editItem เพื่อแก้ไขข้อมูล                                                                                                                                                                             
  editItemList(index){
    const todo = [...this.state.list];
    const editTodo = prompt('Edit todo');
    if(editTodo !== null && editTodo.trim() !== ""){
      let updateTodos = [...todo];
      updateTodos[index].value = editTodo;
      this.setState({
        list: updateTodos,
      });
    }
  }

  render(){
    return (
      <Container>
        <Row style={{ 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center", 
                      fontSize: "3rem", 
                      fontWeight: "bolder", 
                      color: "yellow"
                  }} >
          Todo list
        </Row>
        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
              <InputGroup className="mb-3">
                <FormControl 
                    placeholder='Add item ...'
                    size="xl"
                    value={this.state.newUserInput}
                    onChange={(item) => this.updateInput(item.target.value)} 
                    aria-label="Add something"
                    aria-describedby="basic-addon2"
                />
                <InputGroup>
                  <Button
                    variant="dark"
                    className="mt-2"
                    onClick={() => this.addNewItem()}>
                      Add
                    </Button>
                </InputGroup>
              </InputGroup>  
          </Col>
        </Row>
        <Row>
          <Col md = {{span : 5 , offset:4}}>
              <ListGroup>
                {/* map over and print items */}
                {this.state.list.map((item, index) => {
                  return(
                    <div key = {item.id}>
                      <ListGroup.Item
                        variant='dark'
                        action
                        style ={{display: "flex", 
                                 justifyContent: "space-between"}}
                      >
                        {item.value}
                        <span>
                          <Button style={{marginRight: "10px"}}
                          variant = "light"
                          onClick={() => this.deleteItemList(item.id)}>
                            Delete
                          </Button>
                          <Button variant='light'
                          onClick={() => this.editItemList(index)}>
                            Edit
                          </Button>
                        </span>
                      </ListGroup.Item>
                    </div>
                  )
                })}
              </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;