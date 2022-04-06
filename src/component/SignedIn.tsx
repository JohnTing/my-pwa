
import { useEffect, useState } from "react";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

import { Table } from "antd";
import moment from "moment";

import { getAuth, User } from "firebase/auth";


// import { getMessaging, getToken, onMessage } from "firebase/messaging";



// const PUBLIC_VAPID_KEY = "BMH_PRGL8WPnyUg5DtvvMzIOdex-uEVMYJYj2V9ariIyGxgQeMcTlzYXlqE-NlVLyYn0BARhMsa8nX36f6Tkbtw"

type dataT = {
  username: string,
  email: string,
  other: string
}

type dataTid = {
  key: number,
  username: string,
  email: string,
  other: string
}



export default function SignedIn() {

  const [user, setUser] = useState<User>(); // Local signed-in state.
  const [dataVal, setDataVal] = useState<dataT>();

  const [loginDatas, setLoginDatas] = useState<dataT[]>();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {

    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      
      if(user) {
        setUser(user);
        pushUserData(user.uid, { username: ""+user.displayName, email: ""+user.email, other: "" + user.emailVerified })

        user.getIdToken(true).then((token) => {console.log(token)})
      }
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);



  



  function pushUserData(userId: string, data: dataT) {
    if (!userId) {
      return
    }
    const db = getDatabase();

    set(ref(db, `users/${userId}/list/${moment.now()}/`), {
      ...data
    });
  }


  function readUserData(userId: string) {
    if (!userId) {
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

  function loginData(userId: string | undefined) {
    if (!userId) {
      return
    }


    onValue(ref(getDatabase(), `users/${userId}/list`), (snapshot) => {

      const dataList = new Array<dataTid>()
      
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        dataList.push({key:childKey,  ...childData })
      });
      setLoginDatas(dataList)

    }, {
      onlyOnce: true
    });

  }

  useEffect(() => {
    if (user) {
      readUserData(user.uid)
      loginData(user.uid)
    }
  }, [user]);


  const columns = [
    {
      title: 'key',
      dataIndex: 'key',
      key: 'key',
      render: (text: number) => <>{moment.unix(text/1000).toLocaleString()}</>
    },
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'other',
      dataIndex: 'other',
      key: 'other',
    },
  ];



  return (<>
    <h1>Name: {user?.email} <br /></h1>
    <h2>username: {dataVal?.username}</h2>

    <Table dataSource={loginDatas} columns={columns} />;


    


  </>);



}
