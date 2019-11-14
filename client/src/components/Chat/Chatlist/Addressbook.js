import React, { Component } from "react";
import { connect } from "react-redux";
import { get_chatlist } from '../../../store/actions/Chat/chatList'
//material-ui import
import { Typography, Button, DialogTitle, Dialog, Checkbox, FormControl, FormGroup, FormControlLabel, Divider, Grid, Fab } from "@material-ui/core";
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
//style 
const styles = {
  checkbox: {
    marginLeft: "30px",
    color: "primary"
  },
  buttonstyle: {
    marginLeft: '300px',
  }
};

//체크박스 임시 저장
let checkboxvalue = [];
let fulladdresses = [];
class Addressbook extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      users: [],
      address: [],
      checked: false
    };
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.projects)
    // render 와 동시에 주소록 가져오기
    const { projects } = this.props;
    if (projects.length > 0) {
      projects.map(project => {
        this.getaddress(project.project_id);
      })
    }


    this.setState({ address: fulladdresses });
  }

  // 주소록 가져오기
  getaddress = (project_id) => {
    fulladdresses=[]
    fetch(`/getAddress/${project_id}`)
      .then(response => response.json())
      .then(
        function (addresses) {
          addresses.map(address => {
            console.log(address.member_name, this.props.user.name)
            if (address.member_name !== this.props.user.name) {
              fulladdresses.push({ project_name: address.project_name, member_name: address.member_name })
            }

          })

        }.bind(this)
      );
  };



  // 다이얼 열기
  handleClickOpen = () => {
    checkboxvalue=[]
    this.setState({
      open: true

    });
    checkboxvalue.push(this.props.user.name)
    console.log(this.state);
  };

  // 다이얼 닫기
  handleClose = () => {
    this.setState({
      open: false
    });
    console.log(this.state.users);
  };
  // 체크박스 클릭
  handleCheckedValue = e => {
    
    if (e.target.checked == true) {
      if (!checkboxvalue.includes(e.target.value)) {
        checkboxvalue.push(e.target.value);
      }
      // console.log(checkboxvalue);
      // console.log(this.state.users);
      this.setState({ users: checkboxvalue });
    } else {
      if (checkboxvalue.includes(e.target.value)) {
        for (var i = 0; i < checkboxvalue.length; i++) {
          if (checkboxvalue[i] === e.target.value) {
            checkboxvalue.splice(i, 1);
          }
          // console.log(checkboxvalue);
          console.log(this.state.users);
        }
      }
    }
  };

  // 새로운 채팅 유저 리스트 DB 추가
  addNewChat = (e) => {
    console.log("addNewChat 호출 ");
    e.preventDefault();
    const { dispatch } = this.props
    let room_name = ""
    this.state.users.map((user, index) => {
      if (index < this.state.users.length - 1) {
        room_name = room_name + user + "\,"
      } else {
        room_name = room_name + user
      }

    })
    let data = {

      room_name: room_name,
      users: this.state.users,
      meesages: []
    }
    console.log('test', data);
    console.log(this.state.address);
    fetch('/api/newChats', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: "cors",
      credentials: 'include',
      body: JSON.stringify(data)

    }).then(this.handleClose())
      .then(dispatch(get_chatlist(this.props.user.name)))

  }

  render() {

    console.log("Addressbook render props projects", this.props.projects)



    let addresses = this.state.address;
    console.log(Object.values(this.state.address), typeof Object.values(this.state.address))
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
          <Grid container spacing={1} style={{ width: 400 }}>
            <Grid item xs={12}>
              <DialogTitle>
                채팅에 추가할 사람을 선택하세요.
          </DialogTitle>
            </Grid>
            <Divider />
            <FormControl>
              <FormGroup>
                {/* {addresses.length !== 0
                  ? addresses.map(address => (
                    <FormControlLabel
                      control={<div>
                        <Grid item xs={6}><Checkbox
                          style={styles.checkbox} // value=user.id
                          onClick={this.handleCheckedValue}
                          value={address.member_id}
                        /></Grid>
                        <Typography item xs={3}>{address.member_id}</Typography><Typography item xs={3}>{address.project_name}</Typography></div>
                      }
                    // label={[address.member_id, address.project_id]}
                    ></FormControlLabel>
                  ))
                  : null} */}

                {addresses.length !== 0
                  ? addresses.map(address => (
                    <div key={address.project_id} style={{ display: 'flex', flexDirection: "row" }}>
                      <Grid item xs={4}>
                        <Checkbox
                          style={styles.checkbox} // value=user.id
                          onClick={this.handleCheckedValue}
                          value={address.member_name}
                        />
                      </Grid>
                      <Grid item xs={4} style={{ marginTop: 10 }} >{address.member_name}</Grid>
                      <Grid item xs={4} style={{ marginTop: 10 }}>{address.project_name}</Grid>
                      {/* <Typography item xs={3}>{address.member_name} {address.project_name} </Typography> */}

                    </div>

                    // label={[address.member_id, address.project_id]}

                  ))
                  : null}




                <Grid item xs={12}>
                  <FormControlLabel control={<Button style={styles.buttonstyle} onClick={this.addNewChat}>채팅방 생성</Button>} />
                </Grid>
              </FormGroup>
            </FormControl>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects.projectlists,
  user: state.members.user
})

const dispatchToProps = (dispatch) => ({

  get_chatlist: (member_id) => {
    dispatch(get_chatlist(member_id))
    console.log("Addressbook, dispatch : get_chatlist =>", member_id)
  },

})
export default connect(mapStateToProps)(Addressbook);
