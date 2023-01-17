import React, {useState, useEffect} from 'react'
import TarjetaTarea from './TarjetaTarea'
import {Link} from 'react-router-dom'
import Logout from './Logout'
// import SimpleSlider from './SliderTarjetas'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useHistory} from 'react-router-dom'


const Tareas = () => {
  const history = useHistory()
    let id_user_log = window.localStorage.getItem('id')
    let token_user_log = window.localStorage.getItem('token')
    // con useSTage lo que hace es almacenar los valores obtenidos de la api, ya que tareas 
    // será el array que los almacenara y setTareas es la funcion que lo actualizará
    let [tareas, setTareas] = useState([])

    if (!token_user_log){
      history.push('/')
    }


    // Usamos useEffect para ejecutar un codigo cuando se cambia, se cargan o se actualizan las dependencias
    // los cual recibe el codigo a ejecutar y el array de las dependencias. Los usamos para que cada vez que se cargar la pagina obtengamos los datos
    // de la api al "dia" 
    useEffect(() => {
        getTareas()
    }, [])

    // generamos una funcion asincrona (esto nos permite usar await) para obtener los datos de la promesa (la promesa es laos datos que "tarde o tenaprano" nos mandara la api)
    let getTareas = async () => {
        // con await estamos diciendo que una funcion, en este caso fetch nos promete darnos valores (los de la api)
        let response = await fetch('/api/tareas',{
          method: "POST",
          headers:{
            'Authorization': 'Token ' + token_user_log, 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"id":id_user_log})
        })
        // luego aca lo usamos para decir que data tarde o tempranos convertira los datos que obtuvimos de la api a formato json
        let data = await response.json()
        // console.log('DATA:', data)
        setTareas(data)
    }

    const [settings, setSettings] = useState({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      centerMode: true,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
              }
          },
          {
              breakpoint: 480,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
              }
          }
      ]
    });


  return (
    // d-flex align-items-center justify-content-center
    <div className=''>
        <div className='botonesLgin'>
          <Link to={`/tarea/nuevo/`}><button>Crear Tarea</button></Link>
          <Logout/>
        </div>
          <div className='d-flex flex-column '>
          <h2 className='subTitulo'>Diarias</h2>
            <div>
              <Slider className='sliderTareas' {...settings}>
                  {tareas.filter(tareas => tareas.tiempo_tarea === 1).map((tarea, index) => (
                    <TarjetaTarea key = {index} tarea = {tarea} />
                  ))}
              </Slider>
            </div>
            <h2 className='subTitulo'>Semanales</h2>
            <div>
              <Slider className='sliderTareas' {...settings}>
                  {tareas.filter(tareas => tareas.tiempo_tarea === 2).map((tarea, index) => (
                    <TarjetaTarea key = {index} tarea = {tarea} />
                  ))}
              </Slider>
            </div>
            <h2 className='subTitulo'>Mensuales</h2>
            <div>
              <Slider className='sliderTareas' {...settings}>
                  {tareas.filter(tareas => tareas.tiempo_tarea === 3).map((tarea, index) => (
                    <TarjetaTarea key = {index} tarea = {tarea} />
                  ))}
              </Slider>
            </div>
          </div>
          <br />
    </div>
  )
}

export default Tareas