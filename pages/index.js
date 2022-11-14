import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu/";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    return (
      <>
       <CSSReset/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
            <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
            <Header></Header>
            <Timeline searchValue={valorDoFiltro} playlists={config.playlists}/>
           </div>
      </>
          )
  }
  
  export default HomePage

  

  const StyledHeader = styled.div`
   background-color: ${({ theme }) => theme.backgroundLevel1};
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
     
    }
    .user-info{
      display: flex;
      align-items: center;
      padding: 16px 32px;
      width: 100%;
      gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;
   

  function Header(){
    return(
        <StyledHeader>
          {/*<img src="" />*/}
          <StyledBanner bg={config.bg}/>
          <section className="user-info">
            <img src={`https://github.com/${config.gitHub}.png`} />
            <div>
              <h2>{config.name}</h2>
              <p>{config.job}</p>
            </div>
          </section>

        </StyledHeader>
    )
  }

  function Timeline({searchValue, ...propriedades}) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistNames = Object.keys(propriedades.playlists);
    // Statement
    // Retorno por expressão
    return(
        <StyledTimeline>
          {playlistNames.map( (playlistName) =>{
            const videos = propriedades.playlists[playlistName];
            //console.log(playlistName);
            //console.log(videos);
            return (
                <section key={playlistName}>
                    <h2>{playlistName}</h2>
                    <div>
                        {videos.filter((video)=>{
                          const titleNormalized = video.title.toLowerCase();
                          const searchValueNormalized = searchValue.toLowerCase();
                          return titleNormalized.includes(searchValueNormalized)
                        })
                        .map((video) => {
                            return (
                                <a href={video.url}>
                                    <img src={video.thumb} />
                                    <span>
                                        {video.title}
                                    </span>
                                </a>
                            )
                        })}
                    </div>
                </section>
            )
          })}
        
        </StyledTimeline>
    )
  }