import React, { useState, useEffect } from 'react'
import data from "C:\Users\Mayank Awasthi\Desktop\Full_Stack_Assignment\react_frontend\src\data.json";
const UseEffectAPI = () => {
        const [users, setUsers] = useState([]);
        const getUsers = async () => {
                const response = await fetch('http://127.0.0.1:8000/django_api/project/');
                setUsers(await response.json());
        }
    
        useEffect(() => {
            getUsers();
        }, []);
        {
            const [searchTerm, setSearchTerm] = useState("");
            return (
              <>
                <div className="templateContainer">
                  <div className="searchInput_Container">
                    <input id="searchInput" type="text" placeholder="Search here..." onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }} />
                  </div>
                  <div className="template_Container">
                    {
                      data 
                        .filter((val) => {
                          if(searchTerm == ""){
                            return val;
                          }else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val;
                          }
                        })
                        .map((val) => {
                          return(
                            <div className="template" key={val.id}>
                                <img src={val.image} alt="" />
                                <h3>{val.title}</h3>
                                <p className="price">${val.price}</p>
                            </div> 
                          )
                        })
                    }
                  </div>
                </div>
              </>
            )
          }
}
export default UseEffectAPI