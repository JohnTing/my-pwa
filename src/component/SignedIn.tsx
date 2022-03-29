
import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { child, Database, DataSnapshot, get, getDatabase, onValue, orderByChild, query, ref, set } from "firebase/database";

import { message, Table } from "antd";

type dataT = {
  username: string,
  email: string,
  profile_picture: string
}

type dataTid = {
  key: number,
  username: string,
  email: string,
  profile_picture: string
}


export default function SignedIn() {

  const [user, setUser] = useState(firebase.auth().currentUser); // Local signed-in state.
  const [dataVal, setDataVal] = useState<dataT>();

  const [loginDatas, setLoginDatas] = useState<dataT[]>();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {

    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if(user)
        pushUserData(user.uid, { username: 'name', email: 'email', profile_picture: 'pic' })
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


  function pushUserData(userId: string, data: dataT) {
    if (!userId) {
      return
    }
    const db = getDatabase();

    set(ref(db, `users/${userId}/list/${new Date().getTime()}/`), {
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
      title: 'profile_picture',
      dataIndex: 'profile_picture',
      key: 'profile_picture',
    },
  ];



  return (<>
    <h1>Name: {user?.email} <br /></h1>
    <h2>username: {dataVal?.username}</h2>

    <Table dataSource={loginDatas} columns={columns} />;


    


  </>);



}
