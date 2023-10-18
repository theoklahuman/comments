import Data from "./data.json";
import "./style.css";
// import showMe from "./test";
import plusIcon from "./images/icon-plus.svg";
import minusIcon from "./images/icon-minus.svg";
import replyIconSvg from "./images/icon-reply.svg";
import defaultAvatar from "./images/avatars/image-amyrobson.png";

// showMe();

class CommentCard {
  constructor(user = "") {
    this.user = user;
    this.message =
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.";
    this.avatar = defaultAvatar;
    this.createdTime = "1 month ago";
    this.numberOfLikes = "";
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
    likesCount.textContent = "12";
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
}

const testCard = new CommentCard("amyrobson");

document.body.appendChild(testCard.createNewCard());
document.body.appendChild(testCard.createNewCard());
document.body.appendChild(testCard.createNewCard());
document.body.appendChild(testCard.createNewCard());
document.body.appendChild(testCard.createNewCard());