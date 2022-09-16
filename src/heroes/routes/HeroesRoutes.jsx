import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { MarvelPage, DcPage, Searchpage, HeroePage } from "../pages"


export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />
        <div className="container">

             <Routes>
                  <Route path="marvel" element={<MarvelPage />} />
                  <Route path="dc" element={<DcPage />} />
                  <Route path="search" element={<Searchpage />} />
                  <Route path="hero/:heroId" element={<HeroePage />} />

                  <Route path="/" element={<Navigate to={'/dc'}/>} />
              </Routes>
        </div>
    </>
  )
}
