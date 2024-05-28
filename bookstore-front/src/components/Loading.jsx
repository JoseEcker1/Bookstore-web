import Spinner from 'react-bootstrap/Spinner';
import './Loading.css'

export default function Loading( {container, classeSpin}){

    return(
        <div className={`${container} center`}>
            <Spinner className={classeSpin} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span>Aguardando servidor, isso pode levar alguns minutos..</span>
        </div>
    )
}