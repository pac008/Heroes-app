import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import queryString from "query-string"
import { getHeroesByName } from "../helpers"

export const Searchpage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { q = '' } = queryString.parse(location.search)
  const {searchText, onInputChange} = useForm(
    {
      searchText: q
    }
  )
  const heroes = getHeroesByName(q)
  const onSearchSubmit = (event) => { 
    event.preventDefault ()
    // if ( searchText.length <= 1) return;

    navigate( `?q=${searchText}`)
  }
  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
      <div className="col-5">
        <h4>Searching</h4>
        <hr />
        <form onSubmit={onSearchSubmit} > 
          <input type="text" value={searchText} onChange={onInputChange} placeholder="Search a hero" className="form-control" name="searchText" />
          <button className="btn btn-outline-primary mt-1" >
            Search
          </button>
        </form>
      </div>
      <div className="col-7">
        <h4>Results</h4>
        <hr />
        
        {
          q == '' 
            ? <div className="alert-primary alert animate__animated animate__fadeIn "> Search Heri</div>
            : heroes.length == 0 && <div className="alert-danger alert animate__animated animate__fadeIn "> Not hero with <b>{q}</b></div>
        }
        
        
        
        {
          heroes.map(hero => <HeroCard key={hero.id} {...hero} /> )
        }
        
      </div>
      </div>
    </>

  )
}
