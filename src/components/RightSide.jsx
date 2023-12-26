import React from 'react';
import { FaPhoneAlt, FaVideo, FaRocketchat } from 'react-icons/fa';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';

const RightSide = (props) => {
  const { currentfriend, inputHendle, newMessage, sendMessage } = props;
  return (
    <div className="col-9">
      <div className="right-side">
        <input
          type="checkbox"
          id="dot"
        />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img
                      src="/image/abcd.png"
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <h3>{currentfriend.userName} </h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      {' '}
                      <FaRocketchat />{' '}
                    </label>
                  </div>
                </div>
              </div>
              <Message />
              <MessageSend
                inputHendle={inputHendle}
                newMessage={newMessage}
                sendMessage={sendMessage}
              />
            </div>
          </div>
          <FriendInfo currentfriend={currentfriend} />
        </div>
      </div>
    </div>
  );
};

export default RightSide;
