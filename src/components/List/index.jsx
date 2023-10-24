import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { CardContent, CardsItem, CardsList, ListNav } from "./styles";
import star from '../../images/star.svg';
import { Link } from "react-router-dom";

export function List({ category }) {

    const [items, setItems] = useState([]);
    const [tipo, setTipo] = useState('popular');
    const [search, setSearch] = useState('');

    useEffect(() => {
        //if (search.length >= 3) {
        if (search !== '') {
            axios.get(`https://api.themoviedb.org/3/search/${category}`, {
                params: {
                    page: 1,
                    language: 'pt-BR',
                    api_key: '93b872e765d2e0bc708fe8fd68ea2ad0',
                    query: search
                }
            })
                //sucesso
                .then(response => {
                    setItems(response.data.results);
                    console.log(response.data);
                })

                //erro
                .catch(error => {
                    console.log(error.message);
                });
        }

    }, [search]);

    //Acionado a cada alteração do estado search
    //useEffect(teste, [search])


    //USE EFFECT    
    useEffect(() => {
        //console.log('Componente List renderizado');
        //get -> consultar
        //post -> enviar
        //put -> atualizar
        //delete -> excluir

        //popular
        //top_rated
        //now_playing

        axios.get(`https://api.themoviedb.org/3/${category}/${tipo}`, {
            params: {
                page: 1,
                language: 'pt-BR',
                api_key: '93b872e765d2e0bc708fe8fd68ea2ad0'
            }
        })

            //sucesso
            .then(response => {
                setItems(response.data.results);
                console.log(response.data);
                setSearch('');
            })

            //erro
            .catch(error => {
                console.log(error.message);
            });

    }, [tipo])

    return (
        <div className="container">

            {/* filmes -> now_playing
            Series -> airing_today */}

            <ListNav>

                <input type="text"
                    placeholder="Digite algo para pesquisar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="popular">Populares</option>
                    <option value="top_rated">Tops</option>

                    {category === 'movie'
                        ? <option value="now_playing">Em cartaz</option>
                        : <option value="airing_today">Em exibição</option>
                    }
                </select>

            </ListNav>

            {/* local para exibir os cards */}
            <CardsList>
                {

                    items.map((item) => (
                        <CardsItem key={item.id}>

                            <Link to={`/detalhes/${category}/${item.id}`}>

                                <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} width={360} />

                                <CardContent>
                                    <h2>{category === 'movie' ? item.title : item.name}</h2>
                                    <h3>Ano: {category === 'movie' ? item.release_date.substring(0, 4) : item.first_air_date.substring(0, 4)}</h3>
                                    <span> <img src={star} /> {item.vote_average}</span>
                                </CardContent>
                            </Link>
                        </CardsItem>
                    ))
                }
            </CardsList>

        </div>
    )

}


