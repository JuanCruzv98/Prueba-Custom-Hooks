import { useEffect } from 'react'; //hooks pertenecientes a react
import { useLocation} from 'react-router-dom'; //hooks pertenecientes a react-router-dom
import queryString from 'query-string'; //Importamos queryString que nos ayudara a realizar operaciones con las url
import Table from 'react-bootstrap/Table';
import {Row, Pagination } from './';
import { useProducts } from '../hooks'; //Importamos el custom hook

export const TableComponent = () => {
  const location = useLocation(); //el hook useLocation nos hace escuchar o capturar el campo de la url
  const {p=1} = queryString.parse(location.search);//location.search nos devuelve los parametros de busqueda de la url pero como string, con queryString.parse lo convertimos en un objeto
  //Desestructuramos el objeto de queryString y recuperamos el objeto p que hace referencia a las paginas en caso que no recibamos el parametro le asignamos 1 por defecto
  const {page,products,setPage,startLoadProductos} = useProducts(); //Extraemos las propiedades y los metodos

  useEffect(()=>{
    setPage(p);
  },[])//vamos a escuchar la la montura del componente para actualizar el estado de page


  useEffect(()=>{
    startLoadProductos(p)//Llamamos el metodo del custom hook
  },[page])//vamos a escuchar la actualizacion de page para recibir informacion

  return (
    <>
    <div>
    <Table striped responsive bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Titulo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <Row key={index} product={product} />
          ))}
        </tbody>
      </Table>
      {/* importamos pagination y le pasamos los props */}
      {p>0?(
        <Pagination page={Number(page)} setPage={setPage} path={'/products'}/>
      ):(<></>)}
    </div>
      
    </>
  )
}
