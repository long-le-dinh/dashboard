import React from "react";
import Table from "../Component/DashboardComponent/Table/Table";
import usePagination from "../lib/usePagination";
import TableRows from "../Component/LogComponent/TableRows";
import { TableHead } from "../Component/LogComponent/TableHead";
import Link from "next/link";
import Img from 'next/image'
import menuImg from '../public/menuIcon.png'
import deviceImg from '../public/Logos-Device-Manager-icon.png'
import dbImg from '../public/logo.jpg'
import logImg from '../public/log.png'
import settingImg from '../public/logo.jpg'
import usImg from '../public/user_icon.png'

import styles from "../styles/actionlogs.module.css";
import Pagination from "../Component/LogComponent/Pagination";
import { useEffect, useState } from "react";
import request from "../lib/auth";

function ActionLogTable() {
  const [data, setDataDevice] = useState([]);
  const [total, setTotal] = useState(0);
  const [inputSearch, setInputSearch] = useState("");

  const { itemPage, currentItems, currentPage, setCurrentPage } =
    usePagination(data);

  const CompTableRow = (rows, index) => <TableRows rows={rows} key={index} />;

  useEffect(() => {
    const getDataDevice = async () => {
      const response = await request.get("log");
      setDataDevice(response.data);
      let totalTemp = 0;
      response?.data?.forEach((item) => (totalTemp += item.DeviceID));
      setTotal(totalTemp);
    };
    getDataDevice();
  }, []);

  const handleSearchLogs = async () => {
    const response = await request.get(
      `http://localhost:5000/api/log/search?Name=${inputSearch}`
    );
    setDataDevice(response.data);
    setCurrentPage(1);
  };

  const columns = TableHead || [];
  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <p className={styles.menu_logo}>
          <Img
            src={menuImg}
            className={styles.img}
            alt="a"
            width="auto"
            height="auto"
          />
        </p>
        <div className={styles.menu}>
          <h2 className={styles.manager}>
            <Img
              src={deviceImg}
              className={styles.img}
              alt="a"
              width="auto"
              height="auto"
            />
            Device manager
          </h2>
          <ol className={styles.ol}>
            <li className={styles.link_db}>
              <Link className={styles.a} href={{ pathname: "./dashboard" }}>
                <Img
                  src={dbImg}
                  alt="a"
                  className={styles.img}
                  width="auto"
                  height="auto"
                />
                Dashboard
              </Link>
            </li>
            <li className={styles.link_log}>
              <Link className={styles.a} href={{ pathname: "./log" }} style={{color: "blue"}}>
                <Img
                  alt="a"
                  src={logImg}
                  className={styles.img}
                  width="auto"
                  height="auto"
                />
                Logs
              </Link>
            </li>
            <li>
              <Link className={styles.a} href={{ pathname: "/" }}>
                <Img
                  alt="a"
                  src={settingImg}
                  className={styles.img}
                  width="auto"
                  height="auto"
                />
                Setting
              </Link>
            </li>
          </ol>
        </div>
      </div>
      <div className={styles.section_heading}>
        <div className={styles.heading}><p className={styles.name_user}><Img alt='a' src={usImg} className={styles.img} width="auto" height="auto" />Wellcom john</p></div>
        <div className={styles.content__head}>
          <label className={styles.label}>Action Logs</label>
          <div className={styles.form__search}>
            <input
              type="text"
              className={styles.search}
              id="name"
              name="Name"
              placeholder="name ...."
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <button className={styles.search__btn} onClick={handleSearchLogs}>
              Search
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.Table}>
        <Table
          columns={columns}
          data={currentItems}
          CompTableRow={CompTableRow}
          total={total}
        />
        
      </div>
      <Pagination
          itemPage={itemPage}
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </div>
  );
}

export default ActionLogTable;
