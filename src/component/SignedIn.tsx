
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { child, get, getDatabase, push, ref, set } from "firebase/database";
import Password from "antd/lib/input/Password";


type dataT = {
  username: string, 
  email: string, 
  profile_picture : string
}

export default function SignedIn() {

    const [user, setUser] = useState(firebase.auth().currentUser); // Local signed-in state.
    const [dataVal, setDataVal] = useState<dataT>();

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setUser(user);
        pushUserData(user?.uid, {username:'name', email:'email', profile_picture:'pic'})
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);


    function writeUserData(userId: string | undefined, data: dataT) {
      if(!userId) {
        return
      }
      const db = getDatabase();
      
      set(ref(db, 'users/' + userId), {
        data
      });
    }

    function pushUserData(userId: string | undefined, data: dataT) {
      if(!userId) {
        return
      }
      const db = getDatabase();
      
      set(ref(db, `users/${userId}/list/${new Date().getTime()}/`), {
        ...data
      });


    }

    function readUserData(userId: string | undefined) {
      if(!userId) {
        return
      }

      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setDataVal(snapshot.val() as dataT)
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    


    useEffect(() => {
      if(user) {
        readUserData(user.uid)
      }
      
        //writeUserData(user.uid, "userName", "userEmail", "userImageUrl")


    }, [user]);




  return (<>
  <h1>Name: {user?.email} <br/></h1>
   <h2>{dataVal?.username}</h2>
    
    </>);
}
