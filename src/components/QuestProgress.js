import React from "react";

export default function Profile() {
  // Мок-данные пользователя
  const user = {
    name: "Иван Иванов",
    phone: "+7 999 123-45-67",
    email: "ivan.ivanov@mail.ru",
    birthday: "2000-05-06",
    avatar: "/avatar-demo.png",
    gender: "Мужской",
    card: "1234 5678 0001 1112"
  };

  // Форматируем дату
  const birthRu = user.birthday ? user.birthday.split("-").reverse().join(".") : "";

  return (
    <div style={{maxWidth:430,margin:"0 auto",padding:"22px 12px 82px"}}>
      <div className="card" style={{maxWidth:380,margin:"24px auto",padding:"22px 16px 20px 16px"}}>
        {/* Шапка с аватаром и ФИО */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
          <img src={user.avatar} alt="avatar" style={{
            width: 62, height: 62, borderRadius: 18, border: "2.5px solid #915ee5"
          }}/>
          <div>
            <div style={{
              fontWeight: 700, fontSize: 23, color: "#050F58", marginBottom: 2,
              fontFamily: "'Montserrat', Arial, sans-serif"
            }}>{user.name}</div>
          </div>
        </div>

        {/* Личные данные */}
        <div style={{fontWeight:700, color:"#403688", fontSize:15, marginBottom:8}}>Личные данные</div>
        <div style={{marginBottom:7}}>
          <div style={{color:"#8f8f8f", fontSize:13}}>Пол</div>
          <div style={{fontSize:15, color:"#333"}}>{user.gender}</div>
        </div>
        <div style={{marginBottom:7}}>
          <div style={{color:"#8f8f8f", fontSize:13}}>Дата рождения</div>
          <div style={{fontSize:15, color:"#333"}}>{birthRu}</div>
        </div>
        <div style={{height:1,background:"#ece7ff",margin:"16px 0"}}/>

        {/* Контакты */}
        <div style={{fontWeight:700, color:"#403688", fontSize:15, marginBottom:8}}>Контакты</div>
        <div style={{marginBottom:7}}>
          <div style={{color:"#8f8f8f", fontSize:13}}>Телефон</div>
          <div style={{fontSize:15, color:"#333"}}>{user.phone}</div>
        </div>
        <div style={{marginBottom:7}}>
          <div style={{color:"#8f8f8f", fontSize:13}}>E-mail</div>
          <div style={{fontSize:15, color:"#333"}}>{user.email}</div>
        </div>
        <div style={{height:1,background:"#ece7ff",margin:"16px 0"}}/>

        {/* Карта лояльности */}
        <div style={{fontWeight:700, color:"#403688", fontSize:15, marginBottom:8}}>Карта лояльности</div>
        <div style={{marginBottom:7}}>
          <div style={{color:"#8f8f8f", fontSize:13}}>Номер карты</div>
          <div style={{fontSize:15, color:"#333", letterSpacing:1}}>{user.card}</div>
        </div>

        {/* Кнопка Редактировать */}
        <button
          style={{
            marginTop: 22,
            width: "100%",
            border: "none",
            borderRadius: 11,
            padding: "12px 0",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(98deg, #915ee5 0%, #FF731F 120%)",
            fontSize: 16,
            cursor: "pointer"
          }}
          disabled
          title="В следующей версии"
        >
          Редактировать профиль
        </button>
      </div>
    </div>
  );
}