import { Col, Container, Row } from 'reactstrap';
import './index.scss';

function Footer() {
  return (
    <Container tag="footer" className="footer">
      <Row>
        <Col lg={{ size: 4 }}>
          <h5>Our Address</h5>
          <p>Level 13, 2 Elizabeth St,</p>
          <p>Melbourne, Victoria 3000, Australia</p>
        </Col>
        <Col lg={{ size: 4 }}>
          <h5>Opening Hours</h5>
          <p>Monday - Friday</p>
          <p>09:00 AM - 06:00 PM</p>
          <div className="divider" />
          <p>Saturday</p>
          <p>10:00 AM - 05:00 PM</p>
        </Col>
        <Col lg={{ size: 4 }}>
          <h5>+387-32-333-444</h5>
          <p>If you have any question, feel free to contact us</p>
          <a href="mailto: noreply@site.com">noreply@site.com</a>
        </Col>
      </Row>
      <div className="footer-divider" data-testid="footer" />
      <p className="creds">Haris Beslic @ 2022. All Rights Reserved</p>
    </Container>
  );
}

export default Footer;
