import { useState } from "react";

function usePagination(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPage, setItemPage] = useState(5);
  const indexOfLastItem = currentPage * itemPage;
  const indexOfFirstItem = indexOfLastItem - itemPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  return {
    currentPage,
    setCurrentPage,
    itemPage,
    currentItems,
    setItemPage,
  };
}

export default usePagination;