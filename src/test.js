import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import infoo from "./data.json";
import "./styles.css";
import "../images/icon-plus.svg";
import "../images/icon-minus.svg";
import "../images/icon-reply.svg";
import "../images/icon-edit.svg";
import "../images/avatars/image-amyrobson.png";
import "../images/avatars/image-juliusomo.png";
import "../images/avatars/image-maxblagun.png";
import "../images/avatars/image-ramsesmiron.png";

let targetID = "";
export const Data = infoo;
export let newestid = 0;
for (const comment of Data.comments) {
  if (comment.replies.length === 0) {
    newestid += 1;
  } else {
    newestid += 1;
    for (const commentReplies of comment.replies) {
      newestid += 1;
    }
  }
}

export class CommentCard {
  constructor(id, content, createdAt, score, user, replies, replyingTo) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.score = score;
    this.user = user;
    this.replies = replies;
    this.replying = replyingTo;
  }

  sendInfoToJson() {
    console.log(+targetID);
    for (const comments of Data.comments) {
      console.log(comments.id);
      console.log(comments.id === +targetID);
      if (comments.id === +targetID) {
        console.log(Data);
        comments.replies.push({
          id: this.id,
          content: this.content,
          createdAt: this.createdAt,
          score: this.score,
          user: this.user,
          replies: this.replies,
          replyingTo: testTextField.replying,
        });
        console.log(Data);
      } else {
        for (const commentReplies of comments.replies) {
          console.log("I got here");
          if (commentReplies.id === +targetID) {
            
            if ((commentReplies.replies === null) || (commentReplies.replies === undefined)) {
              commentReplies.replies = [];
              console.log(Data);
              console.log(commentReplies.replies);
              console.log("I also got here");
              commentReplies.replies.push({
                id: this.id,
                content: this.content,
                createdAt: this.createdAt,
                score: this.score,
                user: this.user,
                replies: this.replies,
                replyingTo: testTextField.replying,
              });
              console.log(Data);
            } else {
              commentReplies.replies.push({
                id: this.id,
                content: this.content,
                createdAt: this.createdAt,
                score: this.score,
                user: this.user,
                replies: this.replies,
                replyingTo: testTextField.replying,
              });
            }
          }
        }
      }
    };
    console.log(Data);
    testTextField.replying = "";
  }

  // checkIfReplying() {
  //   console.log(this.replying)
  // }

  createNewCard() {
    const element = document.createElement("div");
    element.className = "main-comment";
    element.id = this.id;
    const commentHeadingElement = document.createElement("div");
    commentHeadingElement.className = "comment-heading";
    const avatar = document.createElement("img");
    avatar.src = this.user.image.png;
    const h5 = document.createElement("h5");
    h5.className = "main-poster__username";
    h5.textContent = this.user.username;
    const h6 = document.createElement("h6");
    h6.className = "time-posted";
    h6.textContent = this.createdAt;
    commentHeadingElement.appendChild(avatar);
    commentHeadingElement.appendChild(h5);
    commentHeadingElement.appendChild(h6);
    const commentText = document.createElement("p");
    commentText.textContent = this.content;
    const plusSign = document.createElement("img");
    plusSign.src = "./images/icon-plus.svg";
    plusSign.className = "plus-sign";
    plusSign.addEventListener("click", () => {
      console.log("I clicked the plus sign!");
    });
    const likesCount = document.createElement("div");
    likesCount.className = "likes-number";
    likesCount.textContent = this.score;
    const minusSign = document.createElement("img");
    minusSign.src = "./images/icon-minus.svg";
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
    replyIcon.src = "./images/icon-reply.svg";
    replyIcon.className = "reply-icon";
    const replyText = document.createElement("div");
    replyText.textContent = "Reply";
    replyText.className = "reply-text";
    replyText.id = this.id;
    replyText.pointer = "cursor";
    replyText.addEventListener("click", (event) => {
      this.getComment(element.id);
      targetID = element.id;
      testTextField.replying = this.getComment(element.id);
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
    return element;
  }

  getComment(target) {
    for (const comments of Data.comments) {
      if (comments.replies.length !== 0) {
        for (const commentReplies of comments.replies) {
          if (+target === commentReplies.id) {
            document.querySelector(
              "textarea"
            ).textContent = `@${commentReplies.user.username}`;
            const replyingTo = commentReplies.user.username;
            return replyingTo;
          }
        }
      }
      if (+target === comments.id) {
        document.querySelector(
          "textarea"
        ).textContent = `@${comments.user.username}`;
        const replyingTo = comments.user.username;
        return replyingTo;
      }
    }
  }

  getCommentID(target) {
    for (const comments of Data.comments) {
      if (comments.replies.length !== 0) {
        for (const commentReplies of comments.replies) {
          if (+target === commentReplies.id) {
            document.querySelector(
              "textarea"
            ).textContent = `@${commentReplies.user.username}`;
            const commentID = commentReplies.id;
            return commentID;
          }
        }
      }
      if (+target === comments.id) {
        document.querySelector(
          "textarea"
        ).textContent = `@${comments.user.username}`;
        const commentID = comments.id;
        return commentID;
      }
    }
  }
}

export class TextField {
  constructor(user = "") {
    this.user = user;
    this.content = "";
    this.avatar = "";
    this.createdAt = "";
    this.score = "";
    this.id = "";
    this.replying = "";
  }
  createInput() {
    const textAreaContainer = document.createElement("div");
    textAreaContainer.className = "text-area-container";
    const textArea = document.createElement("textarea");
    const avatarAndSendContainer = document.createElement("div");
    avatarAndSendContainer.className = "avatar-and-send__container";
    const userAvatar = document.createElement("img");
    userAvatar.src = Data.currentUser.image.png;
    const textAreaActionButton = document.createElement("button");
    textAreaActionButton.type = "button";
    textAreaActionButton.className = "action-button";
    textAreaActionButton.textContent = "Send";
    textAreaActionButton.addEventListener("click", this.takeAction);
    textArea.placeholder = "Add a Comment";
    avatarAndSendContainer.appendChild(userAvatar);
    avatarAndSendContainer.appendChild(textAreaActionButton);
    textAreaContainer.appendChild(textArea);
    textAreaContainer.appendChild(avatarAndSendContainer);
    return textAreaContainer;
  }

  takeAction() {
    const message = document.querySelector("textarea").value;
    const newCard = new CommentCard(
      ++newestid,
      message,
      "now",
      0,
      Data.currentUser,
      [],
      this.replying
    );
    console.log(message);
    newCard.content = message;
    newCard.sendInfoToJson();
    newCard.replyingTo = newCard.getComment();
    // newCard.checkIfReplying();
    const textSection = document.querySelector(".text-area-container");
    // document.body.removeChild(textSection);
    // document.body.appendChild(newCard.createUserCommentCard());
    buildPage();
    document.body.insertAdjacentElement(
      "beforeend",
      testTextField.createInput()
    );
  }
}

export default function buildPage() {
  document.body.innerHTML = "";
  // if (jsonFile.comments.replies.length === 0) {
  //   const newCard = new CommentCard(
  //     jsonFile.comments.id,
  //     jsonFile.comments.content,
  //     jsonFile.comments.createdAt,
  //     jsonFile.comments.score,
  //     jsonFile.comments.user,
  //     jsonFile.comments.replies,
  //     jsonFile.comments.replyingTo
  //   );
  //   document.body.appendChild(newCard.createNewCard());
  //   return;
  // } else {
  //   const newCard = new CommentCard(
  //     jsonFile.comments.id,
  //     jsonFile.comments.content,
  //     jsonFile.comments.createdAt,
  //     jsonFile.comments.score,
  //     jsonFile.comments.user,
  //     jsonFile.comments.replies,
  //     jsonFile.comments.replyingTo
  //   );
  //   document.body.appendChild(newCard.createNewCard());
  //   buildPage(jsonFile.comments[length - 1]);
  // }

  for (const comments of Data.comments) {
    if (comments.replies.length === 0) {
      const newCard = new CommentCard(
        comments.id,
        comments.content,
        comments.createdAt,
        comments.score,
        comments.user,
        comments.replies,
        comments.replyingTo
      );
      document.body.appendChild(newCard.createNewCard());
    } else {
      const newCard = new CommentCard(
        comments.id,
        comments.content,
        comments.createdAt,
        comments.score,
        comments.user,
        comments.replies,
        comments.replyingTo
      );
      document.body.appendChild(newCard.createNewCard());
      for (const commentReplies of comments.replies) {
        const newCard = new CommentCard(
          commentReplies.id,
          `@${commentReplies.replyingTo} ${commentReplies.content}`,
          commentReplies.createdAt,
          commentReplies.score,
          commentReplies.user,
          commentReplies.replies,
          commentReplies.replyingTo
        );
        document.body.appendChild(newCard.createReplyCard());
      }
    }
  }
}

const testTextField = new TextField("juliusomo");
