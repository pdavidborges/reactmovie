import { Link } from "react-router-dom";
import { Banner } from "../../components/Banner";
import cardHomeMovies from '../../images/card-home-movies.png';
import cardHomeSeries from '../../images/card-home-series.png';
import { CardsHomeStyle } from "./styles";

export function Inicio() {
    return (
        <>
            <Banner title="Filmes & Séries">
                <p>Lista de filmes e séries baseada na API The Movie DB.
                    Confira as produções mais populares do mundo.</p>                    
            </Banner>

            <CardsHomeStyle>
                <Link to='/filmes'>
                    <img src={cardHomeMovies} alt="" />
                </Link>

                <Link to='/series'>
                    <img src={cardHomeSeries} alt="" />
                </Link>
            </CardsHomeStyle>

        </>
    )

}