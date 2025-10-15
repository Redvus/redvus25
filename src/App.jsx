// import { useState } from 'react'
import './styles/app.scss'
import './assets/fonts/fontawesome-free-7.0.0-web/scss/regular.scss';
import './assets/fonts/fontawesome-free-7.0.0-web/scss/solid.scss';
import './assets/fonts/fontawesome-free-7.0.0-web/scss/fontawesome.scss';
import './assets/fonts/fontawesome-free-7.0.0-web/scss/brands.scss';

import Footer from './components/Footer';
import Header from './components/Header';
import Container from './components/Container';
import Calendar from './components/Calendar';
// import TestAnim from './components/TestAnim';

export default function App() {
    // const [count, setCount] = useState(2)
    // const [delay] = useState(2);
    
    return (
        <div>
            {/* <div className="card">
                <button onClick={() => setCount((count) => count * 3)}>
                    count is {count}
                </button>
            </div> */}
            <Header />
            <div className="wrapper">
                <Container>
                    {/* <TestAnim delayed={delay} /> */}
                    <Calendar />
                </Container>
                <Footer className="footer-long" />
            </div>
        </div>
    )
}
