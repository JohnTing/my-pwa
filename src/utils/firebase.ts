


export const config = {
    apiKey: "AIzaSyAIbWdjuHHOt2k58QnrWrc61pvMKDK8NZ0",
    authDomain: "fir-1-3536a.firebaseapp.com",
    databaseURL: "https://fir-1-3536a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-1-3536a",
    storageBucket: "fir-1-3536a.appspot.com",
    messagingSenderId: "831281444587",
    appId: "1:831281444587:web:3371b659f337e4ab4470ae",
    measurementId: "G-PB4DSHRZ8F"
};



export function isLoginIn() {
    return localStorage.getItem("islogin") === "true";
}

export function setLoginIn(setting : boolean) {
    localStorage.setItem("islogin", setting ? "true": "false")
}