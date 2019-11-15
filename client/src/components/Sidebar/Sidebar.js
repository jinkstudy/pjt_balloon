import React, { Component } from "react";
import "./sidebar.css";
// import {Logo-solo} from "../resources/icons/logo.png";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import DeveloperBoardRoundedIcon from "@material-ui/icons/DeveloperBoardRounded";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from "@material-ui/core/Typography";

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectInfo from './ProjectInfo';
import CorrImg from './CorrImg'

const styles = {
  dividermax: {
    backgroundColor: "#F8F0ED",
    width: "200px"
  },

  dividerlow: {
    backgroundColor: "#F8F0ED"
  },

  changebutton: {
    color: "white"
  },

  popup: {
    padding: '8px',
    width: '370px',
    height: '100%',
    backgroundColor: '#F8F0ED'
  },

  profile: {
    display: 'flex',
    width: '100%',
    height: '130px',
  },
  corrImg: {
    width: '140px',
  },

  myInfo: {
    width: '100%',
    height: '100%',
  },

  typForm: {
    padding: '10px',
    marginTop: '13px',
  },
  typ: {
    color: 'pink',
    fontWeight: 'bold',
    fontSize: '25px',
  }
};



class Sidebar extends Component {
  constructor(props) {

    super(props);
    this.state = {
      isSidebarExpanded: true,
      file: null,
      name: '',
      email: '',
    }
  };

  // 기본 사이드바
  sidebarExpanded = () => (
    <div className="sidebar" >
      <div className="expanded">
        <Button
          style={styles.changebutton}
          role="presentation"
          onClick={() => this.setState({ isSidebarExpanded: false })}
        >
          <ArrowBackIosRoundedIcon />
        </Button>
      </div>
      <div className="list">
        <List>
          <div className="listitem">

            {/* Account 팝업창 */}
            <PopupState variant="popover" popupId="demo-popup-popover">
              {popupState => (
                <div>

                  {/* Acoount 버튼을 클릭하면 */}
                  <ListItem button variant="contained" {...bindTrigger(popupState)}>

                    <AccountBoxRoundedIcon fontSize="large" />

                    <div className="listitemtext">
                      <ListItemText primary="Accounts" />
                    </div>

                  </ListItem>

                  {/* 팝업창을 활성화 */}
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >


                    {/* 팝업창 */}
                    <div style={styles.popup}>

                      {/* 프로필 */}
                      <div style={styles.profile}>

                        {/* 사진 수정 */}
                        <div style={styles.corrImg}>
                          <CorrImg email={this.props.user.email} />
                        </div> {/* 사진수정 끝 */}

                        {/* 내정보 */}
                        <div className="myInfo" style={styles.myInfo} >
                          <div style={styles.typForm}>
                            <Typography style={styles.typ}>
                              {this.props.user.name} <br/>
                              {this.props.user.email}
                            </Typography>
                            {/* <img src={Logo-solo}></img> */}
                          </div>
                        </div>


                      </div> {/* 프로필 끝 */}

                      {/* 프로젝트정보 */}
                      <ProjectInfo />

                    </div> {/* 팝업창 끝 */}

                  </Popover>
                </div>
              )}
            </PopupState>
          </div>

          <Divider style={styles.dividermax} />

          <div className="listitem">

            <Link to={`/kanban/${this.props.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItem button>
                <DeveloperBoardRoundedIcon fontSize="large" />
                <div className="listitemtext">
                  <ListItemText primary="Boards" />
                </div>
              </ListItem>
            </Link>
          </div>


          <Divider style={styles.dividermax} />

          <div className="listitem">
            <Link to={`/chat/${this.props.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItem button>
                <MessageRoundedIcon fontSize="large" />
                <div className="listitemtext">
                  <ListItemText primary="Messges" />
                </div>
              </ListItem>
            </Link>
          </div>
          <Divider style={styles.dividermax} />
          <div className="listitem">
            <Link to={`/config/${this.props.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItem button>
                <SettingsRoundedIcon fontSize="large" />
                <div className="listitemtext">
                  <ListItemText primary="Settings" />
                </div>
              </ListItem>
            </Link>
          </div>
          <Divider style={styles.dividermax} />
        </List>
      </div>
    </div>
  ); // after button click, isSidebarExpanded => false

  sidebarCollapsed = () => (
    <div className="sidebar collapsed">
      <div className="collaps">
        <Button
          style={styles.changebutton}
          role="presentation"
          onClick={() =>
            this.setState({
              isSidebarExpanded: true
            })
          }
        >
          <ArrowForwardIosRoundedIcon />
        </Button>
      </div>
      <div className="list">
        <List>
          <div className="listitem">
            <ListItem button>
              <AccountBoxRoundedIcon fontSize="large" />
            </ListItem>
          </div>
          <Divider style={styles.dividerlow} />
          <div className="listitem">
            <ListItem button>
              <DeveloperBoardRoundedIcon fontSize="large" />
            </ListItem>
          </div>
          <Divider style={styles.dividerlow} />
          <div className="listitem">
            <ListItem button>
              <MessageRoundedIcon fontSize="large" />
            </ListItem>
          </div>
          <Divider style={styles.dividerlow} />
          <div className="listitem">
            <ListItem button>
              <SettingsRoundedIcon fontSize="large" />
            </ListItem>
          </div>
          <Divider style={styles.dividerlow} />
        </List>
      </div>
    </div>
  ); // after button click, isSidebarExpanded => true
  render() {

    console.log("Sidebar user", this.props.user)
    const { isSidebarExpanded } = this.state;
    return (
      <div className="app">
        {isSidebarExpanded && this.sidebarExpanded()}
        {isSidebarExpanded || this.sidebarCollapsed()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  member: state.members.member,
})

export default connect(mapStateToProps)(Sidebar);
