import {gql} from "@apollo/client";


export const GET_ALL_PLANETS = gql`
query spaceCenters($page: Int!){spaceCenters(page: $page
pageSize:12) {
 pagination {
total,
page
pageSize
},
 nodes {
id:
uid,
name,
description,
latitude,
longitude,
planet{id,name}
}
}}
`

export const GET_FLIGHTS = gql`
query  flights($from: ID){
  flights (from: $from){
  pagination {
              total,
              page
              pageSize
              },
    nodes {
            id,
            code,
            departureAt,
            launchSite{
            planet{
                    id,
                    name,
                    }
      }
    landingSite{
    planet{
    id,
    name,
    }
    }
  }
 }
}
`