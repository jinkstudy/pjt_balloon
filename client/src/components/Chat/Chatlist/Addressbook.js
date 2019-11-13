import React, { Component } from "react";
import {
  Button,
  DialogTitle,
  Dialog,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Divider
} from "@material-ui/core";

const styles = {
  checkbox :{
    marginLeft: "30px",
    color: "primary",
  },
}

let checkboxvalue = [];


class Addressbook extends Component {
  // 생성자
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      users : [],
      address:[],
      checked : false,
    };
  }
  componentDidMount() {
    console.log('componentDidMount()호출')
      // this.handleClickOpen();
      // console.log("getaddress 호출");
      // this.getaddress();
      this.getaddress();
      console.log('버튼 클릭 후 DidMount',this.state.address);
  }

  // 열기
  handleClickOpen = () => {
    console.log("handleClickOpen 호출");
    this.setState({
      open: true
    });
    // this.getaddress()
    //this.setState({address:this.getaddress()})
    // console.log(this.state.address)
    console.log('didmount:',this.state.address)
  };

  // 닫기
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  // 체크박스 클릭 
  handleCheckedValue = (e) =>{
    // console.log(e.target.value)
    if(e.target.checked == true){
      if (!checkboxvalue.includes(e.target.value)) {
        checkboxvalue.push(e.target.value)
      }
    // console.log(checkboxvalue)
    // console.log(e.target.checked)
    this.setState({users:checkboxvalue})
  }
  else {
    if (checkboxvalue.includes(e.target.value)) {
      for( var i = 0; i < checkboxvalue.length; i++){ 
        if ( checkboxvalue[i] ===e.target.value) {
          checkboxvalue.splice(i, 1); 
        }
     }
    //  console.log(checkboxvalue)
    }
  }
}
  // 주소록 가져오기 
  getaddress = () => {
    // this.handleClickOpen()
    // console.log("getaddress 호출");
    // console.log("fetch 실행")
    fetch('/getmember')
       .then(test =>test.json())
       .then(function(address){
        this.setState({address:address})
       }.bind(this)) 
    // console.log(this.state.address)
  }

  // 주소록 과 클릭 오픈 이벤트 통합
    // handleNewChatbutton = () => {
    //   console.log("handleNewChatbutton 호출")

    //   this.handleClickOpen();
    //   this.getaddress();
      
    //   console.log("test:",this.state.address);
    // }

  
  render() {
    console.log('render');
    return (
      <div className="addressbookContainer">
        <Button
          variant="outlined"
          aria-label="signup"
          onClick={this.handleClickOpen}
        >
          PLUS
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>새로운 채팅방에 추가할 인원을 선택하여 주십시오.</DialogTitle>
          <Divider/>
          <FormControl>
            <FormGroup>
              {/* {this.state.address.length !== 0 ? address.map(address => <FormControlLabel
                control={<Checkbox style={styles.checkbox} value={address} // value=user.id
                onClick={this.handleCheckedValue}></Checkbox>}
                label="user1"
              />): null} */}
              <Divider/>
              {/* <FormControlLabel
                control={<Checkbox style={styles.checkbox} value="two" 
                onClick={this.handleCheckedValue}></Checkbox>}
                label="user2"
              /> */}
              <Divider/>
              <FormControlLabel
                control={<Button>채팅방 생성</Button>}
              />
            </FormGroup>
          </FormControl>
          </Dialog>
      </div>
    );
  }
}
export default Addressbook;
