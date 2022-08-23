import React,  { useState,  useEffect  } from "react";
import styles from "./list.module.css"


const List = ({addList}) => {

    // const [listItem, setListItem] = useState(0);

    // const listItemRef = React.createRef();

    // useEffect(()=>{
    //     console.log("호출")
    //     setListItem(addList());
    // },[addList])

    return(
        <div className={styles.list}>
            <ul>
                {/* <li ref={this.listItemRef}>리스트</li> */}
                <li>리스트</li>
                <li>리스트</li>
            </ul>
            {/* <button>+</button> */}
        </div>
    );
}



export default List;