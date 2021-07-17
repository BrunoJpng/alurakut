import { useState, useEffect } from 'react';

import { Box } from '../src/components/Box';
import { MainGrid } from '../src/components/MainGrid';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt="" />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {comunidades.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`} key={itemAtual.title}>
                <img src={itemAtual.image} alt="" />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          );
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = "brunojpng";
  const [comunidades, setComunidades] = useState([]);
  const pessoasFavoritas = [
    'rafaballerini', 
    'diego3g', 
    'maykbrito'
  ];
  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/brunojpng/followers')
      .then(response => response.json())
      .then(data => setSeguidores(data))

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'feb482b577c597385a2daea0b4fa27',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then(response => response.json())
      .then(response => {
        const { allCommunities } = response.data;
        setComunidades(allCommunities)
      })
  }, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(event) {
              event.preventDefault();
              const dadosDoForm = new FormData(event.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              }).then(response => response.json())
                .then(response => {
                  const { registroCriado } = response
                  setComunidades([...comunidades, registroCriado])
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />            
              </div>
              <div>
                <input
                  placeholder="Coloque a URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque a URL para usarmos de capa"
                  type="text"
                />            
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map(itemAtual => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} alt="" />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas das comunidades ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} alt="" />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
