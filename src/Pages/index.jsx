import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { AreaChart } from "../Components/AreaChart";
import { Scatterplot } from "../Components/ScaterPlot/ScaterPlot";
import data from "../data1";
import "./pages.css";


const MainViewContainer = () => {
    const [reportdata, setReportData] =  useState(null);
    const [yearData, setYearData] = useState(null);
	const [selectedYear, setSelectedYear] = useState(0);
	const [totalPop, setTotalPop] = useState(0);
    const [areaChartData, setAreaChartData] = useState(null);
    const [scatterChartData, setScatterChartData] = useState(null);

    useEffect(() => {
        setReportData(data);
        extractYear();
    }, []);

    const extractYear = () => {
        const uniqueYear = data.filter((y, index, self) =>
        index === self.findIndex((t) => (t.Year === y.Year)));
        return setYearData(uniqueYear);
    };

	const changeHandler = (value) => {
		setSelectedYear(value);
		const tempData = data.filter((y) => y.Year == value);
		console.log("Filtered Data is", tempData);
		const sum = tempData.reduce(
			(accumulator, currentValue) => accumulator + parseInt(currentValue["Population (000s)"]),
			0,
		  );
		const AreaData = reportdata.map((d) =>{
            let yValue = parseInt(d["Population (000s)"]);
            let xValue = parseInt(d.Year);

            return {
                x: xValue,
                y: yValue
            }
        });

        const scatterData = tempData.map((d) =>{
            let yValue = d.Population_Growth_Rate;
            let xValue = d.Population_Density;
            return {
                x: xValue,
                y: yValue
            }
        });

        console.log("Area Chart DATA: ", AreaData);
		console.log("SUM IS :", sum);
        console.log("Scatter Unique data" , scatterData);
		setTotalPop(sum);
		setReportData(tempData);
        setAreaChartData(AreaData);
        setScatterChartData(scatterData);
	}

    return(
        <Container>
            <Row>
                <Col>
                    <Form.Select aria-label="Select Year" id="Dropdown year" name="Year selector" onChange={(e) => changeHandler(e.target.value)}>
                        <option>Select Year</option>
                        {yearData !== null && yearData.length >= 1 && yearData.map((year, index) => (
							<option key={index} value={year.Year}>
						        Year : {year.Year}
						    </option>
          				))
						}
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <h2>Overview World Population</h2>
                <Col>
                    <Card>
						<h4>WORLD POPULATION</h4>
						<h5>({selectedYear !== 0 ? selectedYear : ""})</h5>
						<p className="">
							<b>{totalPop}</b>
						</p>
                    </Card>
                </Col>
                <Col>
                    { areaChartData !== null && 
                    <Card>
                        <h4>POPULATION GROWTH</h4>
                        {reportdata !== null && <AreaChart width={400} height={400} data={areaChartData}/>}
                    </Card>}
                </Col>
            </Row>
            <Row>
                <h2>Growth Vs Density</h2>
                <Col>
                { scatterChartData !== null && 
                    <Card>
                        <Scatterplot data={scatterChartData} width={400} height={400} />
                    </Card>}
                </Col>
            </Row>
        </Container>
    );
}

export default MainViewContainer;