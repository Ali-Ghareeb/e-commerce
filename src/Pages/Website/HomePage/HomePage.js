import './Home.css';
import Landing from "../../../Components/Landing/Landing";
import LatestSaleProdcuts from '../../../Components/Website/Prodcut/SaleProdcuts/ShowLatestSaleProdcuts';
import ShowTopRated from '../../../Components/Website/Prodcut/TopRated/ShowTopRated';
import { Container } from 'react-bootstrap';
import ShowLatestProdcuts from '../../../Components/Website/Prodcut/LatestProdcuts/ShowLatestProdcuts';

export default function HomePage() {
    return (
        <div>
            <Landing />
            <LatestSaleProdcuts />
            <Container>
                <div className='d-flex align-items-start flex-wrap mt-5'>
                    <ShowTopRated />
                    <ShowLatestProdcuts />
                </div>
            </Container>
        </div>
    );
}
