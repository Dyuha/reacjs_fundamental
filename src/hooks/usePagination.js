import { useMemo, useState } from "react"

export const usePagination = (totalPages) => {
  const [pagesArray, setPagesArray] = useState([]); 
  useMemo(() => {
    for (let i = 0; i < totalPages; i++) {
      setPagesArray(pagesArray => [...pagesArray, i+1])
    }
  }, [totalPages])
  return pagesArray;
}