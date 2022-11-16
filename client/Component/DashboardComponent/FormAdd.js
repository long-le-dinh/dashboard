import { useState } from "react";
import styles from "../../styles/dashboard.module.css";
import request from "../../lib/auth";
import {toast} from 'react-toastify'

function FormAddDevices({setRefreshTable, refreshTable}) {
  const initialState = {
    name: "",
    ip: "",
    mac: "00:1B:44:11:3A:B7",
    pc: "",
    date: ""
  };

  const [inputText, setInputText] = useState(initialState);

  const handleChangeInput = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: inputText.name,
      ip: inputText.ip,
      mac: "00:1B:44:11:3A:B7",
      pc: inputText.pc,
      date: "2022-11-07",
    };
    {request.post("http://localhost:5000/api/devices", formData).then((res) => {
      if (res.status === 200) {
        toast.success('Add successful!')
        setInputText({
          name: "",
          ip: "",
          mac: "00:1B:44:11:3A:B7",
          pc: "",
          date: "",
        });
        setRefreshTable(!refreshTable)
      } else {
        toast.error('Add false!')
      }
    }).catch((err)=>alert(err))}
  };
  
  return (
    <form id="form_add" className={styles.form_add} onSubmit={handleSubmit}>
      <div className={styles.form_text}>
        <input
          type="text"
          name="name"
          id={styles.name}
          placeholder="Name"
          value={inputText.name}
          onChange={handleChangeInput}
          required
        />
        <label className={styles.name__label}></label>
        <p className={styles.error__name}></p>
      </div>

      <div className={styles.form_text}>
        <input type="text" name="ip" id={styles.ip}
          placeholder="IP" value={inputText.ip}
          onChange={handleChangeInput} required
        />
        <label className={styles.ip__label}></label>
        <p className={styles.error__ip}></p>
      </div>

      <div className={styles.form_text}>
        <input type="number" name="pc" id={styles.power}
          placeholder="Power" value={inputText.pc}
          onChange={handleChangeInput} required
        />
        <label className={styles.power__label}></label>
        <p className={styles.error__power}></p>
      </div>

      <div className={styles.action__form}>
        <button className={styles.btn_add} type="submit">Add Device</button>
      </div>
    </form>
  );
}

export default FormAddDevices;
