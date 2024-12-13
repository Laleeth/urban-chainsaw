import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import GlobalStyles from './styles/GlobalStyles';
import LandingPage from './components/home/LandingPage';
import GameCatalog from './components/games/GameCatalog';
import GamePlayer from './components/games/GamePlayer';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AboutPage from './components/about/AboutPage';
import ComicPage from './components/comics/ComicPage';
import LearnPage from './components/learn/LearnPage';
import UserProfile from './components/profile/UserProfile';
import './styles/tailwind.css';


function App() {
    return (
        <Router>
            <GlobalStyles />
            <AuthProvider>
                <ProgressProvider>
                    <Routes>
                        <Route path="/" element={
                            <Layout isHomePage>
                                <LandingPage />
                            </Layout>
                        } />
                        <Route path="/about" element={
                            <Layout>
                                <AboutPage />
                            </Layout>
                        } />
                        <Route path="/comics" element={
                            <Layout>
                                <ComicPage />
                            </Layout>
                        } />
                        <Route path="/learn" element={
                            <Layout>
                                <LearnPage />
                            </Layout>
                        } />
                        <Route path="/login" element={
                            <Layout>
                                <Login />
                            </Layout>
                        } />
                        <Route path="/register" element={
                            <Layout>
                                <Register />
                            </Layout>
                        } />
                        <Route path="/games" element={
                            <Layout>
                                <GameCatalog />
                            </Layout>
                        } />
                        <Route path="/games/:gameId" element={
                            <Layout>
                                <ProtectedRoute>
                                    <GamePlayer />
                                </ProtectedRoute>
                            </Layout>
                        } />
                        <Route path="/profile" element={
                            <Layout>
                                <ProtectedRoute>
                                    <UserProfile />
                                </ProtectedRoute>
                            </Layout>
                        } />
                    </Routes>
                </ProgressProvider>
            </AuthProvider>
        </Router>
    );
}

export default App; 