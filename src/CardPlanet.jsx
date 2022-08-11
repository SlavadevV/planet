import React from 'react';
import {Card, CardContent,} from "@mui/material";


const CardPlanet = ({planets, total}) => {

  return (
    <Card sx={{maxWidth: 300, minHeight: 300}} className={'card'}>
      <CardContent>
        <div className={"card-content"}>
          <div className={`planet color${planets.planet.id}`}/>
        </div>
        <p className={'title'}>
          {planets.name}
        </p>
        <p className={'sub-title'}>Number of flights:{total} </p>
      </CardContent>
    </Card>
  );
};

export default CardPlanet;