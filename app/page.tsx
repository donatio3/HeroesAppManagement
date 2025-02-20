'use client'
import HeroesList from "@/components/heroesList/heroesList";
import HeroesAddForm from "@/components/heroesAddForm/HeroesAddForm";
import HeroesFilters from "@/components/heroesFilters/HeroesFilters";
import { Provider } from "react-redux";
import store from "@/store";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  return (
    <Provider store={store}>
        <main className="app">
            <div  className="content">
                <HeroesList/>
                <div>
                    <HeroesAddForm />
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    </Provider>
    
  );
}
