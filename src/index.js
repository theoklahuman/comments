import buildPage from "./test";
import { TextField, CommentCard, Data, newestid } from "./test";
buildPage();
const testTextField = new TextField("juliusomo");
document.body.insertAdjacentElement("beforeend", testTextField.createInput());