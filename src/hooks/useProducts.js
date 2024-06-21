//Con este archivo creamos custom hooks
//El objetivo de los custom hooks es limpiar lo mas posible el codigo de los componentes, estos en su mayoria van lugados a un componente en especifico o una pagina como es el caso de Producs
//Si tuvieramos mas paginas para productos por ejemplo listar un unico producto lo enviari, agregar, etc aqui tambien incluiriamos codigo referente a esas paginas
import { useState } from "react" //importamos useState de react
import pruebaAPI from "../api/pruebaAPI"

//Los custom hooks se nombran al igual que los hooks de react empesamos por use<Nombre de Hook> en este caso useProducts
export const useProducts = () => {
    const [products,setProducts] = useState([]); //Creamos el estado para los productos
    const [page,setPage] = useState(1);

    const startLoadProductos = async (p) => {
        console.log(page);
        if(p==page){
            const {data} = await pruebaAPI.get(`/product?limit=30&skip=${(page-1)*30}`);//camabiamos a backtick para permitirnos incrustar codigo 
            setProducts(data.products);

        }
    }
    
    //Aqui no retornamos un componente retornamos propiedaddes y metodos 
    return {
        //Propiedades
            products,
            page,
        //Metodos
            setPage,
            startLoadProductos
    }
}
