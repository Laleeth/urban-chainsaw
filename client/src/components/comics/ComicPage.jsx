import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';



const ComicContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #1a1a1a; /* Same dark background */
  color: white;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(45deg, #ff7e5f, #feb47b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const ComicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ComicCard = styled(motion.div)`
  background: #2d3748;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #4a5568;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 99%;
    height: 600px;
    object-fit: cover;
  }

  h3 {
    color: white;
    padding: 1rem;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const ViewerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;

  img {
    max-width: 70%;
    max-height: 70%;
    margin-bottom: 1rem;
    cursor: pointer; /* Indicate that the image is clickable */
    transition: transform 0.3s ease; /* Smooth zoom effect */
  }

  img.zoomed {
    transform: scale(1.5); /* Zoom scale */
  }

  button {
    background: #ff7e5f;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    margin: 0 1rem;

    &:hover {
      background: #feb47b;
    }
  }
`;



const comics = [
  {
    id: 1,
    title: "The golden whispers of konkan",
    author: "Lalith Thomala",
    cover: "https://i.postimg.cc/Y0gSnmMk/Golden-Whispers.png",
    pages: [
      "https://i.postimg.cc/wvgFTD44/1.png",
      "https://i.postimg.cc/26GGq3Pk/2.png",
      "https://i.postimg.cc/Znqc64Sr/3.png",
      "https://i.postimg.cc/x8FPRhfB/4.png",
      "https://i.postimg.cc/RCPG467G/5.png",
      "https://i.postimg.cc/3Jd1R89h/6.png",
      "https://i.postimg.cc/9FKpw6N7/7.png",
      "https://i.postimg.cc/s2R4wpzf/8.png",
      "https://i.postimg.cc/jSfhHMGk/9.png",
      "https://i.postimg.cc/pTsQW4Fy/10.png",
      "https://i.postimg.cc/nLYY5CV4/11.png",
      "https://i.postimg.cc/kGZx8Swm/12.png",
      "https://i.postimg.cc/SQtLw04v/13.png",
      "https://i.postimg.cc/MHX7v575/13-1.png",
      "https://i.postimg.cc/02TYypbG/14.png",
      "https://i.postimg.cc/L8jzYn1c/15.png",
      "https://i.postimg.cc/Pqh1mTbP/16.png",
      "https://i.postimg.cc/bND0P6NN/16-1.png",
      "https://i.postimg.cc/7LV09dXX/17.png"
    ]
    
    
  },
  {
    id: 2,
    title: "The Echoes stone whispers",
    author: "Lalith Thomala",
    cover: "https://i.postimg.cc/9fWcdnDW/Echoes.png",
    pages: [
      "https://i.postimg.cc/vmHk0FbZ/1.png",
"https://i.postimg.cc/Ssn5p6X0/2.png",
"https://i.postimg.cc/kG8p27Ff/3.png",
"https://i.postimg.cc/XJtPNrFr/4.png",
"https://i.postimg.cc/cJ9jj9LM/5.png",
"https://i.postimg.cc/RV5Yjn48/6.png"

    ]
  },
  {
    id: 3,
    title: "Devi's Wrath: The Protector Awakens",
    author: "Lalith Thomala",
    cover: "https://i.postimg.cc/k5p1w2TT/image-4.png",
    pages: [
      "https://i.postimg.cc/pTjZZqhd/image-5.png"

    ]
  },
  {
    id: 4,
    title: "Lost Imprints: A Petroglyph Adventure",
    author: "Lalith Thomala",
    cover: "https://i.postimg.cc/mD1dnTqB/image.png",
    pages: [
      "https://i.postimg.cc/pTjZZqhd/image-5.png"

    ]
  },
  {
    id: 5,
    title: "Lost Imprints: A Petroglyph Adventure",
    author: "Lalith Thomala",
    cover: "https://i.postimg.cc/8CQsv4S4/image-8.png",
    pages: [
      "https://i.postimg.cc/pTjZZqhd/image-5.png"

    ]
  },
  {
    id: 6,
    title: "Lost Imprints: A Petroglyph Adventure",
    author: "Lalith Thomala",
    cover: "https://i.postimg.cc/d0VQrxf8/image-9.png",
    pages: [
      "https://i.postimg.cc/pTjZZqhd/image-5.png"

    ]
  },
  // Add more comics here
];

function ComicPage() {
  const [currentComic, setCurrentComic] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const openComic = (comic) => {
    setCurrentComic(comic);
    setCurrentPageIndex(0);
  };

  const closeComic = () => {
    setCurrentComic(null);
  };

  const nextPage = () => {
    if (currentComic && currentPageIndex < currentComic.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentComic && currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <ComicContainer>
      <Hero>
        <h1>Comic Library</h1>
        <p>Explore and read your favorite comics</p>
      </Hero>

      <ComicGrid>
        {comics.map((comic) => (
          <ComicCard key={comic.id} onClick={() => openComic(comic)}>
            <img src={comic.cover} alt={comic.title} />
            <h3>{comic.title}</h3>
          </ComicCard>
        ))}
      </ComicGrid>

      {currentComic && (
        <ViewerContainer>
          <img
            src={currentComic.pages[currentPageIndex]}
            alt={`Page ${currentPageIndex + 1}`}
          />
          <div>
            <button onClick={prevPage} disabled={currentPageIndex === 0}>
              Previous
            </button>
            <button onClick={closeComic}>Close</button>
            <button
              onClick={nextPage}
              disabled={currentPageIndex === currentComic.pages.length - 1}
            >
              Next
            </button>
          </div>
        </ViewerContainer>
      )}
    </ComicContainer>
  );
}

export default ComicPage;