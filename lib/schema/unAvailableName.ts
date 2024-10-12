import { UNAVAILABLE_USERNAME } from "../constants";

const unAvailableName = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

export default unAvailableName;
