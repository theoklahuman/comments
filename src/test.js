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

const avatarArray = [amyAvatar, maxAvatar, ramsesAvatar, juliusAvatar];

class CommentCard {
  constructor(
    user = "",
    message,
    avatar,
    createdTime,
    numberOfLikes,
    id,
    replying
  ) {
    this.user = user;
    this.message = message;
    this.avatar = avatar;
    this.createdTime = createdTime;
    this.numberOfLikes = numberOfLikes;
    this.id = id;
    this.replying = replying;
  }
  createNewCard() {
    const element = document.createElement("div");
    element.className = "main-comment";
    element.id = this.id;
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
    plusSign.addEventListener("click", () => {
        console.log("I clicked the plus sign!");
    });
    const likesCount = document.createElement("div");
    likesCount.className = "likes-number";
    likesCount.textContent = this.numberOfLikes;
    const minusSign = document.createElement("img");
    minusSign.src = minusIcon;
    minusSign.className = "minus-sign";
    minusSign.addEventListener("click", () => {
        console.log("I clicked the minus sign!");
    });
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
    replyText.id = this.id;
    replyText.pointer = "cursor";
    replyText.addEventListener("click", (event) => {
      console.log("I did what's expected of me!");
      console.log(`I'm about to reply to ${this.user}`);
      console.log(element.className);
    });
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

  createUserCommentCard() {
    const element = this.createNewCard();
    console.log(element[0]);
    return element;
  }
}

export class TextField {
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
    textAreaActionButton.type = "button";
    textAreaActionButton.className = "action-button";
    textAreaActionButton.textContent = "Send";
    textAreaActionButton.addEventListener("click", this.takeAction);
    textArea.placeholder = "Add a Comment";
    avatarAndSendContainer.appendChild(userAvater);
    avatarAndSendContainer.appendChild(textAreaActionButton);
    textAreaContainer.appendChild(textArea);
    textAreaContainer.appendChild(avatarAndSendContainer);
    return textAreaContainer;
  }

  takeAction() {
    const message = document.querySelector("textarea").value;
    const newCard = new CommentCard(
      Data.currentUser.username,
      message,
      avatarArray[3],
      "now",
      0
    );
    const textSection = document.querySelector(".text-area-container");
    document.body.removeChild(textSection);
    document.body.appendChild(newCard.createUserCommentCard());
    document.body.insertAdjacentElement(
      "beforeend",
      testTextField.createInput()
    );
  }
}
const testTextField = new TextField("juliusomo");

export default function buildPage() {
  for (const comments of Data.comments) {
    if (comments.replies.length === 0) {
      const newCard = new CommentCard(
        comments.user.username,
        comments.content,
        avatarArray[comments.id - 1],
        comments.createdAt,
        comments.score,
        comments.id
      );
      console.log(comments.id);
      document.body.appendChild(newCard.createNewCard());
    } else {
      const newCard = new CommentCard(
        comments.user.username,
        comments.content,
        avatarArray[comments.id - 1],
        comments.createdAt,
        comments.score,
        comments.id
      );
      console.log(comments.id);
      document.body.appendChild(newCard.createNewCard());
      for (const commentReplies of comments.replies) {
        const newCard = new CommentCard(
          commentReplies.user.username,
          commentReplies.content,
          avatarArray[commentReplies.id - 1],
          commentReplies.createdAt,
          commentReplies.score,
          commentReplies.id
        );
        console.log(commentReplies.id);
        document.body.appendChild(newCard.createReplyCard());
      }
    }
  }
}
