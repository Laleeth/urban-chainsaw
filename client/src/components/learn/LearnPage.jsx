import { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '../../context/ProgressContext';
import { learningContent } from '../../data/learningContent';
import { images } from '../../services/imageService';
import Timeline from './Timeline';

const LearnContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background: #1a1a1a;
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

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const Tab = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 30px;
  background: ${props => props.active ? '#ff7e5f' : '#4a5568'};
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  white-space: nowrap;
  font-size: 1rem;
  transition: background 0.3s;

  &:first-of-type {
    color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const LearningPath = styled(motion.div)`
  background: #2d3748;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #4a5568;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PathImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const PathContent = styled.div`
  padding: 1.5rem;

  h3 {
    color: white;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
    font-size: 1rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;

  div {
    height: 100%;
    background: #ff7e5f;
    width: ${props => props.progress}%;
    transition: width 0.3s ease;
  }
`;

const categories = [
  { id: 'all', label: 'All Topics' },
  { id: 'basics', label: 'Basics' },
  { id: 'techniques', label: 'Techniques' },
  { id: 'history', label: 'History' },
  { id: 'conservation', label: 'Conservation' }
];

function LearnPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { progress } = useProgress();

  const filteredContent = activeCategory === 'all'
    ? learningContent.topics
    : learningContent.topics.filter(topic => topic.category === activeCategory);

  return (
    <LearnContainer>
      <Hero>
        <h1>Learning Center</h1>
        <p>Explore our comprehensive guides and interactive lessons</p>
      </Hero>

      <CategoryTabs>
        {categories.map(category => (
          <Tab
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </Tab>
        ))}
      </CategoryTabs>

      <Timeline />

      <ContentGrid>
        <AnimatePresence mode="wait">
          {filteredContent.map(topic => (
            <LearningPath
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PathImage image={topic.image} />
              <PathContent>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <ProgressBar progress={progress[topic.id]?.percentage || 0}>
                  <div />
                </ProgressBar>
                <small>
                  {progress[topic.id]?.percentage || 0}% Complete
                </small>
              </PathContent>
            </LearningPath>
          ))}
        </AnimatePresence>
      </ContentGrid>
    </LearnContainer>
  );
}

export default LearnPage;
