import './App.css';
import { Table,Nav,Spinner,Navbar,Container,Button,Card} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Symptoms(){
  return(
    <Card>
      <Card.Header>COVID-19 Symptoms</Card.Header>
      <Card.Body>
        <Card.Text>
          People may be sick with the virus for 1 to 14 days before developing symptoms. The most common symptoms of coronavirus disease are fever, tiredness, and dry cough. Most people (about 80%) recover from the disease without needing special treatment. More rarely, the disease can be serious and even fatal. Older people, and people with other medical conditions (such as asthma, diabetes, or heart disease), may be more vulnerable to becoming severely ill.
        </Card.Text>
        <Button href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/question-and-answers-hub/q-a-detail/coronavirus-disease-covid-19#:~:text=symptoms" variant="outline-info">Click hear to learn more</Button>
      </Card.Body>
    </Card>
  )
}






function App() {
  let [covidData,setCovidData] = useState(null);
  useEffect(()=>{
      fetch('https://data.covid19india.org/data.json')
      .then(res => res.json())
      .then(data => setCovidData(data.statewise))
  },[])
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
        <Navbar.Brand>COVID-19 | India</Navbar.Brand>
          <Nav>
            <Nav.Link href="https://github.com/gomanish">&lt;/&gt; with ♡ by @gomanish</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="data-block">
        <Symptoms></Symptoms>
        <Button className="heading-button" variant="outline-dark">State Wise Report</Button>
        <Table striped bordered hover variant="light" size="sm">
          <thead>
            <tr>
              <th>State</th>
              <th>Confirmed</th>
              <th>Active</th>
              <th>Recovered</th>
              <th>Deaths</th>
            </tr>
          </thead>
          <tbody>
            {
              covidData?
              covidData.filter((x,index) =>{ return(index >0)}).filter((x) =>{ return(x.state!=='State Unassigned')}).map((ele)=>{
                return(
                  <tr>
                    <td>{ele.state}</td>
                    <td><span className="warning">{ele.confirmed}</span></td>
                    <td><span className="success">{ele.active}</span></td>
                    <td><span className="dark">{ele.recovered}</span></td>
                    <td><span className="danger">{ele.deaths}</span></td>
                  </tr>)
              })
              :<Spinner animation="border" />
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
