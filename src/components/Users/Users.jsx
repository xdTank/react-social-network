import React from "react";
import photoImg from "../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import styles from './Users.module.css'
import { NavLink } from "react-router-dom";
import axios from "axios";



let Users = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {
                pages.map((p) => {
                    return <span className={props.currentPage === p && styles.selectedPage}
                        onClick={() => { props.onPageChanged(p); }}>{p}</span>
                })
            }
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile' + u.id}>
                            <img src={u.photos.small != null ? u.photos : photoImg} alt="" />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { 
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "770d148e-1b8f-42a4-9a81-51ad0ba9fa90"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    }) }}>Unfollow</button>
                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "770d148e-1b8f-42a4-9a81-51ad0ba9fa90"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
                            }}>Follow</button>}

                    </div>
                </span>
                <span>
                    <div>
                        {u.name}
                    </div>
                    <div>
                        {u.status}
                    </div>
                </span>
                <span>
                    <div>
                        {/* {u.location.country} */}
                    </div>
                    <div>
                        {/* {u.location.city} */}
                    </div>
                </span>
            </div >)
        }
    </div >
}


export default Users