import { Layout } from "../../components/layouts";
import { NoFavorites } from '../../components/ui/NoFavorites';
import { useState, useEffect } from 'react';
import { localFavorites } from "../../utils";
import { Card, Grid } from "@nextui-org/react";
import { FavoritePokemons } from "../../components/ui";

 const Favoritos = () => {

  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons());
  },[]);

  return (
    <Layout title="favoritos">
      {favoritePokemons.length === 0
      ? (<NoFavorites/>)
      : (<FavoritePokemons favoritePokemons={favoritePokemons}/>
      )
      }
    </Layout>
  )
}



export default Favoritos;