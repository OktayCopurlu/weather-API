import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const Api = () => {
  const [reportData, setReportData] = useState();
  const [city, setCity] = useState("Zug");
  const [country, setCountry] = useState("CH");
  const [show, setGoster] = useState(0);
  const [temp, setTemp] = useState();
  const [cityCode, setCityCode] = useState();
  const [reportTime, setReportTime] = useState();

  let time = new Date(reportTime);
  let hours = time.getHours() + 2;
  let minutes = time.getMinutes();

  useEffect(() => {
    const getReport = async () => {
      const response = await fetch(
        "https://api.weatherbit.io/v2.0/current?&city=" +
          city +
          "&country=" +
          country +
          "&key=077ee4f3e79f488c837d01b1ed2532aa&include=minutely"
      );
      const dataJson = await response.json();
      console.log(dataJson);
      dataJson.data.map((city) => {
        setReportData(city.city_name);
        setTemp(city.temp);
        setCityCode(city.state_code);
        setReportTime(city.ob_time);
      });
    };
    getReport();
  }, [show]);

  return (
    <>
      <div>
        <h1>Weather Reports</h1>
        <InputGroup className="mb-3">
          <FormControl
            onChange={(event) => setCity(event.target.value)}
            placeholder="city name"
          />
          <FormControl
            onChange={(event) => setCountry(event.target.value)}
            placeholder="country code"
          />
          <InputGroup.Append>
            <Button
              onClick={() => setGoster(show + 1)}
              variant="outline-secondary"
            >
              Show
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <Table striped bordered hover responsive="sm" variant="dark">
        <thead>
          <tr>
            <th>City Code</th>
            <th>City Name</th>
            <th>Temp</th>
            <th>Report Time</th>
         
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cityCode}</td>
            <td>{reportData}</td>
            <td>{temp}</td>
            <td>
              {hours}:{minutes}
            </td>
           
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Api;
