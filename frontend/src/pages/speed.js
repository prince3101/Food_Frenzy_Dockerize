import {
    AxesDirective,
    AxisDirective,
    CircularGaugeComponent,
    ColorStop,
    PointerDirective,
    PointersDirective,
    RangeDirective,
    RangesDirective,
  } from "@syncfusion/ej2-react-circulargauge";
  import axios from "axios";
  import { useEffect, useState } from "react";
  
  function Speed() {
  
    const [data, setData] = useState([]);
  
    const getData = async() => {
      try{
        const res = await axios.get("/admin/dashboard")
        setData(res?.data?.payload);
        console.log(setData)
      }
      catch (error){
        console.log(error)
      }
    }
    useEffect(() =>{
      getData();
    },[])
  
  
    return (

      <div className="App">
        <CircularGaugeComponent>
          <AxesDirective>
            <AxisDirective
              startAngle={270}
              endAngle={90}
              radius="150"
              labelStyle={{ position: "Outside" }}
            >
              <PointersDirective>
                <PointerDirective value={data.bill} cap={{ radius: 15 }}></PointerDirective>
              </PointersDirective>
              <RangesDirective>
                <RangeDirective start={0} end={100}></RangeDirective>
              </RangesDirective>
            </AxisDirective>
          </AxesDirective>
        </CircularGaugeComponent>
      </div>
    );
  }
  
  export default Speed;
  