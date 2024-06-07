import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {Link, Routes, Route} from 'react-router-dom';

import '../styles/style.css'

export default function Api_main() {
    let {id} = useParams();
 const [cardAPI, setCardAPI] = useState([])
 useEffect(() => {
    async function fetch_yugi(){
        await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php",
        {method: "GET",}).
        then(response => response.json()).
        then(data => setCardAPI(data)).
        catch(error => console.log(error))
    }
    fetch_yugi()
 },[])

 if(cardAPI.length !== 0){
    let test_api =  cardAPI.data[0];
    let pass = 0;
    console.log(test_api)

    let modifiers = id;
    console.log(modifiers)

    let card_to_display = []


    let forFirst = 50*modifiers; 

    let forLast = forFirst + 50;
    console.log(forFirst + " "+ forLast)

    for(let pass = forFirst; pass <forLast; pass ++){
        card_to_display.push(cardAPI.data[pass])
    }


    const add_card = (data) => {
        
        localStorage.setItem(data, "1");
        
    
      }
    
     return (
        <>
       <div className='grille-contains'>

            {card_to_display.map(element =>
                <div className='partie'> 
                    <h3> 
                        carte: {element.name}
                    </h3>
                    <img src={element.card_images[0].image_url}></img> 
                    <div>
                        <p>race : {element.race}</p>
                        <p>types : {element.type}</p>
                        <p>types : {element.id}</p>
                    
                    </div>
                    <button onClick={()=>add_card(element.name)}>ajouter a ma collection</button>
                </div>
         )}
         
       </div>
       <FooterChoose data={id}/>
       </>
     )
 }
 
}

function FooterChoose({data}){
    console.log("salut")
    let avant = parseInt(data) -1;
    let apres = parseInt(data) +1;
    let avant_url = "/"+avant;
    let apres_url = "/"+apres;
    return(
        <div>
            {data <= 0? "":<Link to={avant_url}><button>retour</button></Link>}
        
         <b>{data}</b> 
       
         {data >= 261? "":<Link to={apres_url}><button>suivant</button></Link>}
        </div>
    )
}


