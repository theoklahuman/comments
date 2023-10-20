import Data from "./data.json";
import "./style.css";
import plusIcon from "./images/icon-plus.svg";
import minusIcon from "./images/icon-minus.svg";
import replyIconSvg from "./images/icon-reply.svg";
import editIconSvg from "./images/icon-edit.svg";
import amyAvatar from "./images/avatars/image-amyrobson.png";
import juliusAvatar from "./images/avatars/image-juliusomo.png";
import maxAvatar from "./images/avatars/image-maxblagun.png";
import ramsesAvatar from "./images/avatars/image-ramsesmiron.png";

// const dataToBeUsed = Data;

// // const ImgElement = document.createElement("img");
// // ImgElement.src = sampleImg;
// // document.body.appendChild(ImgElement);

// console.log(
//   dataToBeUsed.currentUser.image.png === "./images/avatars/image-juliusomo.png"
// );

const avatarArray = [amyAvatar, maxAvatar, juliusAvatar, ramsesAvatar];
let index = 0;

class CommentCard {
  constructor(
    user = "",
    message,
    avatar,
    createdTime,
    numberOfLikes,
    replying
  ) {
    this.user = user;
    this.message = message;
    this.avatar = avatar;
    this.createdTime = createdTime;
    this.numberOfLikes = numberOfLikes;
    this.replying = replying;
  }
  createNewCard() {
    const element = document.createElement("div");
    element.className = "main-comment";
    const commentHeadingElement = document.createElement("div");
    commentHeadingElement.className = "comment-heading";
    const avatar = document.createElement("img");
    avatar.src = this.avatar;
    const h5 = document.createElement("h5");
    h5.className = "main-poster__username";
    h5.textContent = this.user;
    const h6 = document.createElement("h6");
    h6.className = "time-posted";
    h6.textContent = this.createdTime;
    commentHeadingElement.appendChild(avatar);
    commentHeadingElement.appendChild(h5);
    commentHeadingElement.appendChild(h6);
    const commentText = document.createElement("p");
    commentText.textContent = this.message;
    const plusSign = document.createElement("img");
    plusSign.src = plusIcon;
    plusSign.className = "plus-sign";
    const likesCount = document.createElement("div");
    likesCount.className = "likes-number";
    likesCount.textContent = this.numberOfLikes;
    const minusSign = document.createElement("img");
    minusSign.src = minusIcon;
    minusSign.className = "minus-sign";
    const likesSection = document.createElement("div");
    likesSection.className = "likes-section";
    likesSection.appendChild(plusSign);
    likesSection.appendChild(likesCount);
    likesSection.appendChild(minusSign);
    const replyIcon = document.createElement("img");
    replyIcon.src = replyIconSvg;
    replyIcon.className = "reply-icon";
    const replyText = document.createElement("div");
    replyText.textContent = "Reply";
    replyText.className = "reply-text";
    const replySection = document.createElement("div");
    replySection.className = "reply-section";
    replySection.appendChild(replyIcon);
    replySection.appendChild(replyText);
    const commentFooter = document.createElement("div");
    commentFooter.className = "comment-footer";
    commentFooter.appendChild(likesSection);
    commentFooter.appendChild(replySection);
    element.appendChild(commentHeadingElement);
    element.appendChild(commentText);
    element.appendChild(commentFooter);
    return element;
  }

  createReplyCard() {
    const element = this.createNewCard();
    element.className = "main-reply";
    return element;
  }
}

class TextField {
  constructor(user = "") {
    this.user = user;
  }
  createInput() {
    const textAreaContainer = document.createElement("div");
    textAreaContainer.className = "text-area-container";
    const textArea = document.createElement("textarea");
    const avatarAndSendContainer = document.createElement("div");
    avatarAndSendContainer.className = "avatar-and-send__container";
    const userAvater = document.createElement("img");
    userAvater.src = juliusAvatar;
    const textAreaActionButton = document.createElement("button");
    textAreaActionButton.className = "action-button";
    textAreaActionButton.textContent = "Send";
    textArea.textContent = "Add a Comment";
    avatarAndSendContainer.appendChild(userAvater);
    avatarAndSendContainer.appendChild(textAreaActionButton);
    textAreaContainer.appendChild(textArea);
    textAreaContainer.appendChild(avatarAndSendContainer);
    return textAreaContainer;
  }
}
const testTextField = new TextField("juliusomo");

for (const comments of Data.comments) {
  if (comments.replies.length === 0) {
    const newCard = new CommentCard(
      comments.user.username,
      comments.content,
      avatarArray[index],
      comments.createdAt,
      comments.score
    );
    index++;
    document.body.appendChild(newCard.createNewCard());
  } else {
    const newCard = new CommentCard(
      comments.user.username,
      comments.content,
      avatarArray[index],
      comments.createdAt,
      comments.score
    );
    index++;
    document.body.appendChild(newCard.createNewCard());
    for (const commentReplies of comments.replies) {
      const newCard = new CommentCard(
        commentReplies.user.username,
        commentReplies.content,
        avatarArray[index],
        commentReplies.createdAt,
        commentReplies.score
      );
      document.body.appendChild(newCard.createReplyCard());
    }
  }
}
document.body.appendChild(testTextField.createInput());
