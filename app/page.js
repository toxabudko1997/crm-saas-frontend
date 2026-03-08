
'use client'
import {useEffect,useState} from 'react'
import io from 'socket.io-client'

export default function Home(){
 const [orders,setOrders]=useState([])

 useEffect(()=>{
  fetch('http://localhost:4000/orders',{
   headers:{authorization:localStorage.getItem('token')}
  })
  .then(r=>r.json()).then(setOrders)

  const socket=io('http://localhost:4000')
  socket.on('order:new',o=>setOrders(p=>[...p,o]))
 },[])

 return(
  <div style={{padding:40}}>
   <h1>CRM Dashboard</h1>
   {orders.map(o=>(
    <div key={o.id}>
     {o.client} - {o.address}
    </div>
   ))}
  </div>
 )
}
