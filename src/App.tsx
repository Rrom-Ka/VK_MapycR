import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./App.css";
import "./index.css";

import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { GenreList } from "./components/GenreList/GenreList";
import { GenreMoviList } from "./components/GenreList/GenreMoviList";
import { FilmPage } from "./components/FilmPage/FilmPage";
import { Footer } from "./components/Footer/Footer";
import { Account } from "./components/Account/Account";
import { CardListFavorite } from "./components/CardList/CardListFavorite";
import { SettingAccount } from "./components/SettingAccount/SettingAccount";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/genres" element={<GenreList />} />
              <Route
                path="/genresList/:titleGenre"
                element={<GenreMoviList />}
              />
              <Route path="/filmpage/:idFilm" element={<FilmPage />} />
              <Route path="/login" element={<Account />}>
                <Route path="" element={<CardListFavorite />} />
                <Route path="settings" element={<SettingAccount />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
