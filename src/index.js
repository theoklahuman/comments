import buildPage from "./test";
import { TextField } from "./test";
buildPage();
const testTextField = new TextField("juliusomo");
document.body.insertAdjacentElement("beforeend", testTextField.createInput());

// const replyButton = document.querySelector(".reply-text");
// replyButton.addEventListener("click", (event) => {
//     console.log("I did what's expected of me!");
//     console.log(event.target.id);
// })