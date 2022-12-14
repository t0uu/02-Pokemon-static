import { Button, Card, Container, Grid, Text,Image } from "@nextui-org/react";
import { GetStaticProps, NextPage ,GetStaticPaths} from "next";
import { useEffect, useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { localFavorites } from "../../utils";
import confetti from 'canvas-confetti';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props{
  pokemon: Pokemon;
}


 const PokemonPage:NextPage<Props> = ({pokemon}) => {

  // const router = useRouter();
  // console.log(router.query);

  const [isInFavorites, setIsInFavorites] = useState(typeof window === "undefined" && localFavorites.existInFavorites(pokemon.id));

const onToggleFavorite = () => {

 // console.log('Hola mundo');
        // console.log('ID: ', pokemon.id);
        localFavorites.toggleFavorite(pokemon.id);
        // ocupo redibujar mi estado
        // para que cambie al valor inverso
        setIsInFavorites(!isInFavorites);
 
        // si el pokemon esta en favoritos haga la animacion de canvas
        if (isInFavorites) {
            return null;
        } else {
            // hago la animacion
            confetti({
                // para que este sobre todo
                zIndex: 999,
                // de unas 100 particulas
                particleCount: 100,
                // pixeles
                spread: 160,
                // angulo
                angle: -100,
                // cordenadas
                origin: {
                    // (IZQUIERDA) 0 --> 0.ALGOCENTRO --> 1 (DERECHA)
                    x: 1,
                    y: 0,
                }
            })
        }
 
    }






  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{marginTop: '5px'}} gap={2}>
        <Grid xs={12} sm={4} > 
        <Card isHoverable css={{padding:'30px'}}>
          <Card.Body>
            <Card.Image 
            src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
            alt={pokemon.name}
            width={'100%'}
            height={200} 
            />
          </Card.Body>

        </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{display:'flex',justifyContent:'space-between'}}>
              <Text h1>{pokemon.name}</Text>
              <Button
              color="gradient"
              ghost={!isInFavorites}
              onClick={onToggleFavorite}
              >
                {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/>
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}/>
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}/>
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}/>
              </Container>
            </Card.Body>
          </Card>

        </Grid>
      </Grid.Container>
    </Layout>
  )
}


// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value,index) => `${index + 1 }`);
  return {
    paths: pokemons151.map(id => ({
      params: {id: id}
    })),
    fallback: 'blocking'
  }
}
// Despu??s de que se ejecutan los paths, pasan al getStaticProps

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {id} = params as {id:string};
  // const { data } = await  // your fetch function here 
  const pokemon = await getPokemonInfo(id);

  if(!pokemon){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }


  return {
    props: {
      pokemon
    },
    revalidate: 86400,
  }
}




export default PokemonPage;