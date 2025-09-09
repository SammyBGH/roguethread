import React from "react";
import "../styles/Admin.css";

export default function Admin(){
  const [pw,setPw] = React.useState("");
  const [authed,setAuthed] = React.useState(false);
  const [orders,setOrders] = React.useState([]);
  const [msgs,setMsgs] = React.useState([]);

  const login = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({password:pw})
    })
    .then(r=> r.ok ? setAuthed(true) : alert("Wrong password"));
  };

  React.useEffect(()=>{
    if(authed){
      fetch(`${process.env.REACT_APP_API_URL}/admin/orders`)
        .then(r=>r.json())
        .then(setOrders);
      fetch(`${process.env.REACT_APP_API_URL}/admin/messages`)
        .then(r=>r.json())
        .then(setMsgs);
    }
  },[authed]);

  if(!authed){
    return (
      <section className="adm">
        <h2>Admin Login</h2>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} />
        <button onClick={login}>Login</button>
      </section>
    );
  }

  return (
    <section className="adm">
      <h2>Orders</h2>
      <div className="adm__list">
        {orders.map(o=>(
          <div key={o.id} className="adm__card">
            <strong>{o.customer.name}</strong> – {o.customer.email}<br/>
            {o.customer.address}<br/>
            <em>{o.items.length} item(s)</em>
          </div>
        ))}
      </div>

      <h2>Messages</h2>
      <div className="adm__list">
        {msgs.map(m=>(
          <div key={m.id} className="adm__card">
            <strong>{m.name}</strong> – {m.email}<br/>
            {m.message}
          </div>
        ))}
      </div>
    </section>
  );
}
