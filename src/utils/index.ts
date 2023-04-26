const BASEURL = "http://localhost:8000"

 const POST = "/posts";
 const TAG = "/tags";
 const ALL = "/all";
 const CREATE = "/create";
 const EDIT_P = "/edit-post";
 const DELETE = "/change-status";
 const NEWEST = "/newest";
 const TYPE = "/type";
 const ADMIN = "/admin";
 const LOGINN = "/login";
 const REGISTER = "/register";
 const LOG = "/logs";
 const TOTAL = "/total";


export const NEWEST_POST = BASEURL + POST + NEWEST;
export const LOGIN = BASEURL + LOGINN;
export const CREATE_POST = BASEURL + ADMIN + POST + CREATE;
export const EDIT_POST = BASEURL + ADMIN + POST + EDIT_P;
export const FIND_ALL = BASEURL + POST + ALL;
export const CHANGE_STATUS_POST = BASEURL + ADMIN + POST + DELETE + "?id=";
export const GET_ALL_POST = BASEURL + ADMIN + POST + ALL;
export const GET_COUNT_POST = BASEURL + POST + TOTAL;
export const FIND_BY_ID = BASEURL + POST + "?id=";
export const GET_LIST_TAG_AND_COUNT = BASEURL + TYPE;
export const GET_LIST_TAG = BASEURL + TAG + ALL;
export const GET_LIST_POST_BY_TAG = BASEURL + POST + "/find-by-tag?tagId=";
export const GET_LIST_LOG = BASEURL + ADMIN + LOG + ALL;