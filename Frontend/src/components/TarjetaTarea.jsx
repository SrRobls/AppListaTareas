import React from 'react'
import { Card} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const TarjetaTarea = ({tarea}) => {
  const history = useHistory()

  const limitDescription = (description) => {
    if (description.length > 45) {
      return description.substring(0, 45) + '...';
    }
    return description;
  }

  return (
      <Card key = {tarea.id} onClick={() => {history.push(`/tarea/${tarea.id}/`)}} className='mx-3 pointer text-black
      d-flex flex-column shadow card p-2' >
        <Card.Title className='cardTitle'>
          {tarea.titulo}
        </Card.Title>
        <Card.Text>
          {limitDescription(tarea.descripcion)}
        </Card.Text>
        <span>Fecha de creación: {tarea.created.substring(0, 10)}</span> 
      </Card>
  )
}

export default TarjetaTarea