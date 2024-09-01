import { Fragment, useState } from "react";
import { NavigationArea } from "../Company/AgentDetails.style";
import Container from "../ui/Container/Container";
import parse from 'html-react-parser';
import { Product } from "@/graphql/generated/schema";

const ProductNavigation = ({product , className}:{
    className:string
    product?:Product
}) => {
    const [component, setComponent] = useState('Description');
  
    return (
      <Fragment>
        <NavigationArea>
          <Container fluid={true}>
            <ul className={`ant-menu ${className}`}>
              <li className=" cursor-pointer">
                <a
                  className={ `${component === 'Description' ? 'active' : ''}`}
                  onClick={() => setComponent('Description')}
                >
                  Description
                </a>
              </li>
         
              <li className=" cursor-pointer">
                <a
                  className={`${component === 'Fetaures' ? 'active' : ''}`}
                  onClick={() => setComponent('Fetaures')}
                >
                  Fetaures
                </a>
              </li>
              <li className=" cursor-pointer">
                <a
                  className={`${component === 'Reviews' ? 'active' : ''}`}
                  onClick={() => setComponent('Reviews')}
                >
                  Reviews
                </a>
              </li>
            </ul>
            {/* {loggedIn && (
              <Link href={ADD_HOTEL_PAGE}>
                <a className="add_card">
                  <IoIosAdd /> Add Hotel
                </a>
              </Link>
            )} */}
          </Container>
        </NavigationArea>
  
        <Container fluid={true}>
  {
    component === 'Description' &&
    <>
    <div className='flex justify-center items-center align-middle flex-col'>
  
<div className="my-3 text-lg">
{parse(product?.description??"")}
</div>

    </div>
  
  
        
    </>
  }
  
          {component === 'Fetaures' && <></>}
          {component ==='Reviews' && <></>}
        </Container>
      </Fragment>
    );
  };

  export default ProductNavigation