import Clock from "react-live-clock";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DigitalClock = () => {
  return (
    <>
      <Row className="timer-background">
        <Col style={{ textAlign: "center" }}>
          <div className="clock-left">
            <Clock
              className="dashboard-clock"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"US/Eastern"}
            />
            <p>Ft. Gordon, GA</p>
          </div>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <div className="clock-center">
            <Clock
              className="dashboard-clock"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"zulu"}
            />
            <p>Zulu</p>
          </div>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <div className="clock-right">
            <Clock
              className="dashboard-clock"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"Asia/Kuwait"}
            />
            <p>Kuwait City</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DigitalClock;
