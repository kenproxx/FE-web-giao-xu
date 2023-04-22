const BASEURL = "http://localhost:8000"

 const POST = "/posts";
 const TAG = "/tags";
 const ALL = "/all";
 const CREATE = "/create";
 const EDIT = "/edit";
 const DELETE = "/change-status";
 const NEWEST = "/newest";
 const TYPE = "/type";
 const ADMIN = "/admin";
 const LOGINN = "/login";
 const REGISTER = "/register";


export const NEWEST_POST = BASEURL + POST + NEWEST;
export const LOGIN = BASEURL + LOGINN;
export const CREATE_POST = BASEURL + ADMIN + POST + CREATE;
export const FIND_ALL = BASEURL + POST + ALL;
export const GET_ALL_POST = BASEURL + ADMIN + POST + ALL;
export const FIND_BY_ID = BASEURL + POST + "?id=";
export const GET_LIST_TAG_AND_COUNT = BASEURL + TYPE;
export const GET_LIST_TAG = BASEURL + TAG + ALL;
export const GET_LIST_POST_BY_TAG = BASEURL + POST + "/find-by-tag?tagId=";