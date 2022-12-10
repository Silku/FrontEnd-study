import React,  { useState,  useEffect  } from "react";
import { useCallback } from "react";
import styles from "./list.module.css"


const List = () => {
    const [itemList, setItemList] = useState([]);
    const [itemIdx, setItemIdx] = useState(1);



    const addItemList = useCallback(()=>{
            setItemIdx(itemIdx+1)
            setItemList([...itemList, itemIdx])
            // console.log(itemLists)
    },[itemList])

    // useEffect(()=>{
    //         console.log("호출")
    //         setItemList('1');
    // },[itemLists])

    return(
        <div className={styles.list}>
            <ul>
                {itemList.map((itemList, i)=><li key={i}>Item {itemList}</li>)}
                {/* {itemLists} */}
            </ul>
            <button onClick={addItemList}>+</button>
        </div>
    );
}



export default List;