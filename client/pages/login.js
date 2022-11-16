import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from "../styles/Home.module.css";
import { useDispatch } from "react-redux";
import { LoginForm } from "../redux/auth";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const [details, setDetails] = useState({ name: "", password: "" });
  const dispatch = useDispatch();

  const submitHandle = async (e) => {
    e.preventDefault();
    const formData = {
      name: details.name,
      password: details.password,
    };

    const result = await dispatch(LoginForm(formData));
    if (LoginForm.fulfilled.match(result)&&formData.password=='1234') {
        localStorage.setItem("token", result?.payload?.token);
        router.push("./dashboard");
        toast.success("Login Success");
        }else{
            if(details.name == ""){
              clear();
              document.getElementById("inf_user").innerHTML = "Username can be empty!";
              }
            
              else if(details.password == ""){
                clear();
                  document.getElementById("inf_psw").innerHTML = "Password can be empty!";
              }
            
              else{
                if(details.name != "john"){
                  clear();
                  document.getElementById("inf_user").innerHTML = "Username is not correct!";
                }
                else if(details.password != "1234"){
                  clear();
                  document.getElementById("inf_psw").innerHTML = "Password is not correct!";
                }
            }
        }
  }
  const clear = () => {
    document.getElementById("inf_user").innerHTML = "";
    document.getElementById("inf_psw").innerHTML = "";
  };


  return (
    <form className={styles.form_login}>
      <h1>SOIOT SYSTEM</h1>
      <label className={styles.inf} id="inf_user"></label>
      <div className={styles.form_text}>
        <input
          type="text"
          id="user"
          name="user"
          className={styles.user}
          placeholder="User name"
          onChange={(e) => {
            setDetails({ ...details, name: e.target.value });
          }}
          value={details.name}
        />
      </div>
      <label className={styles.inf} id="inf_psw"></label>
      <div className={styles.form_text}>
        <input
          type="password"
          id="psw"
          name="psw"
          className={styles.psw}
          placeholder="Password"
          onChange={(e) => {
            setDetails({ ...details, password: e.target.value });
          }}
          value={details.password}
        />
      </div>
      <input
        name="btn"
        className={styles.btn}
        id="btn"
        type="button"
        value="Input"
        onClick={submitHandle}
      />
      <Link className={styles.aref} href="#">
        or create a new account
      </Link>
    </form>
  );
}

export default Login;
