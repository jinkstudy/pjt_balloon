import React, { useState, useEffect } from "react";
import Chatlistitem from './Chatlistitem';
import "./chatlist.css";
import Addressbook from './Addressbook';

import { Button, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from "@material-ui/core";

const styles = {
  divider: {
    backgroundColor: "black",
    width: "300px"
  }
};



const Chatlist = ({ chats, user }) => {
  return (

    <div className="chatlist">
      <div className="list">
        <List>
          <div className="listitem">
            <ListItem>
              <ListItemText primary="Recent" />
            </ListItem>
          </div>
          <Divider style={styles.divider} />
          <div className="listitem">
            <ListItem>
              <ListItemText primary="New Chat" />
              <Addressbook />
            </ListItem>
          </div>
          <Divider style={styles.divider} />
          {chats.length !== 0 ? chats.map(chatroom => <Chatlistitem key={chatroom.room_id} room={chatroom.room_id} user={user} />) : null}
          {/* <Chatlistitem room={room} name={name}/> */}
        </List>
      </div>
    </div>
  )

};

export default Chatlist;
