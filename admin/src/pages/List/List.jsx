import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

 const removeFood = async (foodId) => {
  try {
    const response = await axios.post(
      `${url}/api/food/remove`,
      { id: foodId }
    );

    if (response.data.success) {
      toast.success("Food item removed");
      fetchList(); // refresh list
    } else {
      toast.error("Failed to remove item");
    }
  } catch (error) {
    console.log(error);
    toast.error("Server error");
  }
};

  useEffect(() => {
    fetchList();
  }, [])
  return (
    <div className='list add flex-col'>
      <p>List of all the Items in the Menu</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) => {
          return(
            <div key = {index} className='list-table-format'>
              <img src = {`${url}/images/` + item.image} alt = "" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick = {() => removeFood(item._id)}className = 'cursor'>X</p>
            </div>

          )
        })}
      </div>
    </div>
  )
}
export default List; 



