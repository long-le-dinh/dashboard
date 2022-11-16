import styles from "../../styles/actionlogs.module.css";
function Pagination({ data, itemPage, currentPage, setCurrentPage  }) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemPage); i++) {
    pages.push(i);
  }
  
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  
  return (
    <div className={styles.list__pagination}>
      {pages.map((number) =>(currentPage === number)?(
        <div key={number} id={number} className={`${styles.pagination__item} ${styles.current__pagination__item}`} onClick={handleClick}>
            {number}
          </div>
      ):(
          <div key={number} id={number} className={styles.pagination__item} onClick={handleClick}>
            {number}
          </div>
        )
      )}
    </div>
  );
}

export default Pagination;
