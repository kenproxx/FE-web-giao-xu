const BASEURL = "http://localhost:8000"

 const POST = "/posts";
 const TAG = "/tags";
 const ALL = "/all";
 const CREATE = "/create";
 const EDIT = "/edit";
 const DELETE = "/create";
 const NEWEST = "/newest";


export const NEWEST_POST = BASEURL + POST + NEWEST;
export const FIND_ALL = BASEURL + POST + ALL;
export const FIND_BY_ID = BASEURL + POST + "?id=";