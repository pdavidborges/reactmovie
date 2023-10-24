import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { BannerDetalhes, Content } from './style';
import {BarLoader} from 'react-spinners';

export function Detalhes(){

    //extraindo da URL as informações passadas no momento do click
    const {id} = useParams();
    const {category} = useParams();
    const navigate = useNavigate();
    
    const [item, setItem] = useState([]);
    const [loader, setLoader] = useState(true);

    function voltar(){
        navigate(-1)
    }

    useEffect(()=> {

        axios.get(`https://api.themoviedb.org/3/${category}/${id}`, {
            params : {                
                language: 'pt-BR',
                api_key: '93b872e765d2e0bc708fe8fd68ea2ad0'
            }
        })

        .then(response => {       
            setItem(response.data); //guardando no estado a resposta da API
            setLoader(false);
        })

        .catch(error=>{
            console.log(error.message);
        })

    }, [])
        
    if(loader){
        return(
            <BarLoader  color="#00B1E9"  width="100%" />
        )
    }

    return(
        <>  
            <BannerDetalhes url={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} />
        
            <Content>

                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt="" />

                <div>
                    <h1>{category === 'movie' ? item.title : item.name}</h1>
                    <h2>{item.tagline}</h2>
                    
                    <ul>                    
                        {<li>Ano: {category === 'movie' ? item.release_date.substring(0,4) : item.first_air_date.substring(0,4)}</li>}
                        <li>Avaliação: {item.vote_average}</li>
                    </ul>

                    <p>
                        {item.overview}
                    </p>

                    <button onClick={voltar}>Voltar</button>
                </div>

            </Content>

        </>
    )

}