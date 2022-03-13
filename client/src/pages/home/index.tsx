import { Col, Row } from 'reactstrap';
import ReactCompareImage from 'react-compare-image';
import { ReactComponent as ClockSvg } from '../../svg/clock.svg';
import './index.scss';

function Home() {
  return (
    <>
      <section className="jumbo">
        <div className="overlay" />
        <div className="content">
          <p>Modern equipment</p>
          <h3>Quality Service For You</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
            sapiente corporis id
          </p>
        </div>
      </section>

      <section className="second-section">
        <div className="content-wrapper">
          <div className="content">
            <span>Modern equipment</span>
            <h4>Professional washing and cleaning</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum
              cum, excepturi porro repudiandae hic delectus tempore aspernatur
              labore aliquam sapiente voluptatem quas soluta. Illo libero, non
              nesciunt pariatur exercitationem animi?
            </p>
          </div>
          <img src="/images/car.png" alt="" />
        </div>
        <Row className="icons">
          <Col lg={{ size: 3 }} sm={{ size: 6 }} className="icon-section md-3">
            <img src="/images/car-wash.png" alt="" />
            <p>Contactless Washing</p>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </Col>
          <Col lg={{ size: 3 }} sm={{ size: 6 }} className="icon-section md-3">
            <img src="/images/cleaning.png" alt="" />
            <p>Safety Materials</p>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </Col>
          <Col lg={{ size: 3 }} sm={{ size: 6 }} className="icon-section md-3">
            <img src="/images/cloth.png" alt="" />
            <p>Modern Equipment</p>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </Col>
          <Col lg={{ size: 3 }} sm={{ size: 6 }} className="icon-section md-3">
            <img src="/images/steering-wheel.png" alt="" />
            <p>Extensive Cleaning</p>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </Col>
        </Row>
      </section>

      <section className="third-section">
        <p>What we do</p>
        <h3>Premium Washing Services</h3>
        <p className="details">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vero
          itaque molestiae exercitationem
        </p>
        <Row className="content">
          <Col xl={{ size: 8 }} className="image-wrapper">
            <img src="/images/car-interior.jpg" alt="" />
          </Col>
          <Col xl={{ size: 4 }} className="details">
            <h3>Exterior Washing</h3>
            <span>
              <ClockSvg />
              30 min
            </span>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Inventore voluptatem, dolor deleniti unde possimus explicabo
              veniam eaque vero dolore
            </p>
            <ul>
              <li>Seats washing</li>
              <li>Vacuum cleaning</li>
              <li>Interior wet cleaning</li>
              <li>Window wiping</li>
            </ul>
          </Col>
        </Row>
      </section>

      <div className="home-divider" />

      <section className="fourth-section">
        <Row>
          <Col xl={{ size: 4 }} className="details">
            <p>Dry cleaning</p>
            <h3>Dry cleaning any dirt inside the car and trunk</h3>
            <span>100% CLEAN</span>
          </Col>
          <Col xl={{ size: 8 }} className="images">
            <ReactCompareImage
              leftImage="/images/before.jpg"
              rightImage="/images/after.jpg"
            />
          </Col>
        </Row>
      </section>
    </>
  );
}

export default Home;
