import React from "react";
import Img from "next/image";
import menuImg from "../public/menuIcon.png";
import deviceImg from "../public/Logos-Device-Manager-icon.png";
import dbImg from "../public/logo.jpg";
import logImg from "../public/log.png";
import settingImg from "../public/logo.jpg";
import usImg from "../public/user_icon.png";
import styles from "../styles/dashboard.module.css";
import Link from "next/link";
import Table from "../Component/DashboardComponent/Table/Table";
import { TableColumn } from "../Component/DashboardComponent/Table/TableColumn";
import TableRows from "../Component/DashboardComponent/Table/TableRows";
import usePagination from "../lib/usePagination";
import Chart from "../Component/DashboardComponent/Chart";
import FormAdd from "../Component/DashboardComponent/FormAdd";
import { useEffect, useState } from "react";
import request from "../lib/auth";

function Dashboard() {
  const [data, setDataDevice] = useState([]);
  const [total, setTotal] = useState(0);
  const [refreshTable, setRefreshTable] = useState(false);

  const { itemPage, currentItems, currentPage, setCurrentPage } =
    usePagination(data);
  const CompTableRow = (rows, index) => <TableRows rows={rows} key={index} />;
  useEffect(() => {
    const getDataDevice = async () => {
      const response = await request.get("devices");
      setDataDevice(response.data);
      let totalTemp = 0;
      response?.data?.forEach((item) => (totalTemp += item.pc));
      setTotal(totalTemp);
    };
    getDataDevice();
  }, [!refreshTable]);

  const MenuDisplay = () =>{
    document.getElementsByName('menu')[0].style.display = "block";
  }

  const MenuDisplayNone = () =>{
    document.getElementsByName('menu')[0].style.display = "none";
  }
  const columns = TableColumn || [];

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
            onMouseMove={MenuDisplay}
          />
        </p>
        <div className={styles.menu} name="menu" onMouseLeave={MenuDisplayNone}>
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
              <Link className={styles.a} href={{ pathname: "./dashboard" }} style={{color: "blue"}}>
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
              <Link className={styles.a} href={{ pathname: "./log" }}>
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

      <div className={styles.heading}>
        <p className={styles.name_user}>
          <Img
            alt="a"
            src={usImg}
            className={styles.img}
            width="auto"
            height="auto"
          />
          Wellcom john
        </p>
      </div>
      <div className={styles.container_table}>
        <div className={styles.Table}>
          <Table
            data={currentItems}
            columns={columns}
            CompTableRow={CompTableRow}
            total={total}
          />
        </div>
        <div className={styles.section2}>
          <div className={styles.Chart}>
            <Chart data={data} />
          </div>
          <div className={styles.add_div}>
            <FormAdd setRefreshTable={setRefreshTable} refreshTable={refreshTable}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
