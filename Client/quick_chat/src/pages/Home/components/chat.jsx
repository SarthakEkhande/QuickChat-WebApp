import { useDispatch, useSelector } from "react-redux";
import { createNewMessage, gettAllmessages } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast/headless";
import { useEffect, useState } from "react";
import moment from "moment";

function Chat() {
  const { user, selectedChat } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const selectedUser = selectedChat?.members.find((u) => u._id !== user._id);

  const [message, setmessage] = useState("");
  const [allMessage, setallMessage] = useState([]);

  const sendmessage = async () => {
    try {
      const cppmessage = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMessage(cppmessage);
      dispatch(hideLoader());
      if (response.success) {
        setmessage("");
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
      return error;
    }
  };
  const getmessages = async () => {
    try {
      dispatch(showLoader());
      const response = await gettAllmessages(selectedChat._id);
      dispatch(hideLoader());
      if (response.success) {
        setallMessage(response.data);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
      return error;
    }
  };

  const formatTime = (timestamp) => {
    const now = moment();
    const diff = now.diff(moment(timestamp), "days");

    if (diff < 1) {
      return `Today ${moment(timestamp).format("hh:mm A")}`;
    } else if (diff == 1) {
      return `Yesterday ${moment(timestamp).format("hh:mm A")}`;
    } else {
      return moment(timestamp).format("MMM D, hh:mm A")
    }
  };
  useEffect(() => {
    getmessages();
  }, [selectedChat]);
  return (
    <div>
      {" "}
      {selectedChat && (
        <div class="app-chat-area">
          <div class="app-chat-area-header">
            {/* <!--RECEIVER DATA--> */}
            {selectedUser.firstName + " " + selectedUser.lastname}{" "}
          </div>
          <div class="main-chat-area">
            {allMessage.map((msg) => {
              const currentusersender = msg.sender === user._id;
              return (
                <div
                  className="message-container"
                  style={
                    currentusersender
                      ? { justifyContent: "end" }
                      : { justifyContent: "start" }
                  }
                >
                  <div>
                    <div
                      className={
                        currentusersender ? "send-message" : "received-message"
                      }
                    >
                      {msg.text}
                    </div>
                    <div
                      className="message-timestamp"
                      style={
                        currentusersender
                          ? { float: "right" }
                          : { float: "left" }
                      }
                    >
                      {formatTime(msg.cratedAt)}{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div class="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendmessage}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
