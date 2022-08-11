import './App.css';
import CardPlanet from "./CardPlanet";
import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import planetImg from './image/planet.svg'
import CloseIcon from '@mui/icons-material/Close';
import {useQuery} from "@apollo/client";
import {GET_ALL_PLANETS, GET_FLIGHTS} from "./query/planet";
import moment from "moment";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function App() {

  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState({})
  const [planets, setPlanets] = useState([])
  const [departs, setDeparts] = useState([])
  const [total, setTotal] = useState(null)
  const [page, setPage] = useState(7)
  const [idPlanet, setIdPlanet] = useState(1)
  const [totalFlight, setTotalFlights] = useState(null)

  const {data, loading, error} = useQuery(GET_ALL_PLANETS, {
    variables: {page: page}
  })

  const {data: flights, loading: loadingFlights} = useQuery(GET_FLIGHTS, {
    variables: {from: idPlanet}
  })

  useEffect(() => {
    if (data?.spaceCenters?.nodes) {
      setPlanets(data?.spaceCenters?.nodes)
      setTotal(data?.spaceCenters?.pagination?.total)
      setPage(data?.spaceCenters?.pagination?.page)
    }
    if (flights?.flights?.nodes) {
      setDeparts(flights?.flights?.nodes)
      setTotalFlights(flights?.flights?.pagination.total)
    }
  }, [data, flights])


  function previousPage() {
    setPage((prev) => prev - 1)
  }

  function nextPage() {
    setPage((prev) => prev + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Spacious</h2>
      </header>
      {loading ? <div className={'loading'}><img className={"img"} src={planetImg}/></div> :
        <div className={'wrap'}>
          <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: open ? 12 : 16}}>
            {planets.map((planets, index) => (
              <Grid key={index}
                    onClick={(e) => (setOpen(true), setDetails(planets), setIdPlanet(planets?.planet.id))}
                    item xs={2} sm={4} md={4}
              >
                <CardPlanet total={total} planets={planets}/>
              </Grid>
            ))}
          </Grid>
          {open && <Card  className={'card-info'}>
            <CardContent >
              <span onClick={() => setOpen(false)}> <CloseIcon className={'icon'}/></span>
              <div className={"title-details"}>
                {details.name}
              </div>
              <div className={'sub-title-details'}>
                {details.description}
              </div>
              <div className={'numbers'}>
                Numbers of flights:
                <br/>
                {totalFlight}
              </div>
              <Typography sx={{fontWeight: 'bold',}} color="text.secondary">
                DEPARTURES:
              </Typography>
              {departs.map((dep) => <Typography key={dep.id} sx={{mb: 1.5}} color="text.secondary">
                <div className={'wrap'}>
                  <img src={planetImg} alt={'1'} width={'60px'} height={'60px'}/>
                  <div style={{fontSize: '13px', marginTop: '11px', marginLeft: '5px'}}>
                    <div style={{color: 'black', fontWeight: 'bold'}}>To Planet : {dep.landingSite.planet.name}</div>
                    <div
                      style={{color: 'grey'}}> {moment(dep.departureAt).format('L')} - {moment(dep.departureAt).format('LT')}</div>
                  </div>
                </div>
              </Typography>)}

            </CardContent>
          </Card>}
        </div>}
      <Box sx={{'& button': {m: 5}}} style={{textAlign: "center"}}>
        <div>
          <Button onClick={previousPage} className={'button'}><KeyboardArrowLeftIcon/> Previous </Button>
          <Button onClick={nextPage} className={'button'}>Next<ChevronRightIcon/></Button>
        </div>
      </Box>
    </div>
  );
}

export default App;
