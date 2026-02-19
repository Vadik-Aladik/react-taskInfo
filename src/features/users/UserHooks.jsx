import { useEffect, useState } from "react";
import api from "./UserApi"

export default function useUsers(){
    const [users, setUsers] = useState({users: []});
    const [loading, setLoading] = useState(true);
    const [limit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [personalUser, setPersonalUser] = useState({
        id: '',
        lastName: '',
        firstName: '',
        maidenName: '',
        age: '',
        address: {},
        height: '',
        weight: '',
        phone: '',
        email: '',
        image: '',
    });
    const [sort, setSort] = useState({
        field: '',
        order: '',
    });
    const [filter, setFilter] = useState({
        key: 'lastName',
        value: '',
    });

    async function getUsers(){
        try{
            setLoading(true);
            const url = api.buildURL({limit, currentPage, sort, filter});
            const data = await api.getFetch(url);
            if (data) setUsers(data);
            setCurrentPage(prev => {
                if(prev > Math.ceil(users.total / limit))
                    return prev = Math.ceil(users.total / limit)+1;
                return prev
            })
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }

    function defaultTable(){
        setSort(()=>({
            field: '',
            order: '',
        }));
        setFilter(()=>({
            key: 'lastName',
            value: '',
        }));
    }

    function restPage(call){
        setFilter(()=>({
            value: ''
        }));
        setCurrentPage(1);
        call();
    }

    function changeSelectValue(field, order) {
        if (order === 'none') {
        setSort({ field: '', order: '' });
        } else {
        setSort({ field, order });
        }
        setCurrentPage(1); // сбрасываем страницу
    }

    function nextPage(){
        setCurrentPage(prev => {
            if(prev < Math.ceil(users.total / limit))
                return prev+1
            return prev
        })
    }
    function pastPage(){
        setCurrentPage(prev => {
        if(prev > 1 )
            return prev-1
        return prev
        })
    }

    useEffect(()=>{
        getUsers();
    },[currentPage, sort, filter]);

    return {
        users,
        setUsers,
        limit,
        currentPage,
        setCurrentPage,
        sort,
        setSort,
        filter,
        setFilter,
        personalUser,
        setPersonalUser,
        loading,

        nextPage,
        pastPage,
        getUsers,
        defaultTable,
        changeSelectValue,
        restPage,
    }
}