
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Pokedex() {
  const [refresh, setRefresh] = useState(false)
  const [cardData, setCardData] = useState([]); // Use a more descriptive name

  useEffect(() => {
    const fetchCards = async () => {
      const keys = Object.keys(localStorage);
      const promises = keys.map(async (key) => {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${key}`, {
          method: 'GET',
        });
        const data = await response.json();
        return data; 
      });

     
      const resolvedData = await Promise.all(promises);
      setCardData(resolvedData); 
    };

    fetchCards();
  }, []);

  if (cardData.length !== 0) {
    console.log('Card data fetched:', cardData); // Log the fetched data
  }

  const suppr_card = (data) =>{
    localStorage.removeItem(data);
  }


  useEffect(() => {
    if (refresh) {
        setRefresh(false)
    }

}, [refresh]);

  return (
    <>
    <Recherche />

    <h1>Ma Collection de carte</h1>
    <div className='grille-contains'>
      {cardData.map((card) => (
        <div className='partie'>
          <h3>
          {card.data[0].name}
          </h3>
         <img src={card.data[0].card_images[0].image_url}></img>
         <div>
              <p>race : {card.data[0].race}</p>
              <p>types : {card.data[0].type}</p>
              <p>id : {card.data[0].id}</p>       
          </div>
          <button onClick={() => suppr_card(card.data[0].name)}>supprimation</button>
        </div>
      ))}
      </div>
      
    </>
  );
}

function Recherche (){
  const [input1,setInput1] = useState();
  const [carteData, setCarteData] = useState(null);
  const [refresh, setRefresh] = useState(false)


  const searching =() =>{
    console.log(input1)
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${input1}`)
      .then((response) => response.json())
      .then((data) => setCarteData(data))
      .catch((error) => console.error('Error fetching card data:', error));

      console.log(carteData)
      if(carteData != null){
        console.log(carteData)
      }
      
  }

  const searching_id =() =>{
    console.log(input1)
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${input1}`)
      .then((response) => response.json())
      .then((data) => setCarteData(data))
      .catch((error) => console.error('Error fetching card data:', error));

      if(carteData != null){
        
        console.log(carteData)
      } 
  }

  const add_card =() =>{

    if(input1 == carteData.data[0].id){
      localStorage.setItem(carteData.data[0].name, "1");
    }else{
      localStorage.setItem(input1, "1");
    }
    //localStorage.setItem(input1, "1");
    setRefresh(true);
  }



  useEffect(() => {
    if (refresh) {
        setRefresh(false)
    }

}, [refresh]);  

  return( 
    <>
    <input type='text' onChange={e => setInput1(e.target.value)}/>
    <button onClick={searching}>rechercher avec le nom</button>
    <button onClick={searching_id}>rechercher avec l'id</button>
    <div>

    { carteData != null? carteData.data[0].name : ""}
    { carteData != null? carteData.data[0].id : ""}
    { carteData != null? <img className='mini-image' src={carteData.data[0].card_images[0].image_url}></img> : ""}
    { carteData != null? <button onClick={add_card}>ajouter la carte</button> : ""}
    
    </div>
    </>
  )
}

// function fetch_yugi(data){
//   fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name="+data,
//   {method: "GET",}).
//   then(response => response.json()).
//   catch(error => console.log(error))
// }
