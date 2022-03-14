import { ReactNode } from 'react';
import { Container } from 'reactstrap';
import Footer from '../footer';
import Header from '../header';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Container tag="main" data-testid="main">
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
