import { Card, Grid } from "@nextui-org/react"
import { FC, PropsWithChildren } from "react"
import { FavoriteCardPokemon } from './FavoriteCardPokemon';

interface pokemons {
favoritePokemons: number[]
}


export const FavoritePokemons:FC<pokemons> = ({favoritePokemons}) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
        {favoritePokemons.map(id => (
          <FavoriteCardPokemon key={id} id={id}/>
        ))}
      </Grid.Container>
  )
}
