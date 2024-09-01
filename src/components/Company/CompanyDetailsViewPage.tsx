'use client'
import React, { useState, useContext, Fragment } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import isEmpty from 'lodash/isEmpty';
import {
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoIosAdd,
} from 'react-icons/io';
import { Popover } from 'antd';
import Container from '@/components/ui/Container/Container';
import Heading from '@/components/ui/Heading/Heading';
import Text from '@/components/ui/Text/Text';
import { ProfilePicLoader } from '@/components/ui/ContentLoader/ContentLoader';
import Loader from '@/components/Loader/Loader';
import AgentDetailsPage, {
  BannerSection,
  UserInfoArea,
  ProfileImage,
  ProfileInformationArea,
  ProfileInformation,
  SocialAccount,
  NavigationArea,
} from './AgentDetails.style';
import { useParams } from 'next/navigation';
import Button from '../ui/button';
import { useModal } from '../modals/context';

const AgentFavItemLists = dynamic(() => import('./AgentFavItemLists'));
const AgentContact = dynamic(() => import('./AgentContact'));
const AgentItemLists = dynamic(() => import('./AgentItemLists'));

const ProfileNavigation = (props) => {
  const [component, setComponent] = useState('allListing');
  const { className } = props;

  return (
    <Fragment>
      <NavigationArea>
        <Container fluid={true}>
          <ul className={`ant-menu ${className}`}>
            <li>
              <a
                className={component === 'allListing' ? 'active' : ''}
                onClick={() => setComponent('allListing')}
              >
                Menus
              </a>
            </li>
            {/* <li>
              <a
                className={component === 'favoriteListing' ? 'active' : ''}
                onClick={() => setComponent('favoriteListing')}
              >
                Favorites
              </a>
            </li> */}
            <li>
              <a
                className={component === 'contact' ? 'active' : ''}
                onClick={() => setComponent('contact')}
              >
                Contact
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
  component === 'allListing' &&
  <>
  <div className='flex justify-center items-center align-middle flex-col'>

        <div className="mt-1 grid grid-cols-1 gap-y-8 gap-x-10 xs:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10 4xl:grid-cols-6 place-items-center place-content-center">

    <div className="listing-card group/item relative inline-flex w-full flex-col">
        <div className="relative w-full overflow-hidden rounded-xl">
       
       
            <div className="listing-item ">
           
          
                    <Image
                      className="aspect-[34/25] bg-gray-lighter"
                      src={"https://www.foodandwine.com/thmb/8N5jLutuTK4TDzpDkhMfdaHLZxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/McDonalds-Hacks-Menu-FT-1-BLOG0122-4ac9d62f6c9143be8da3d0a8553348b0.jpg"}
                      width={300}
                      height={300}
                      alt="boat"
                      priority
                    />
              
        
          
            </div>
     
        </div>
          <div className="content pt-3">
            <div className="mb-1 flex items-center gap-5">
             
            </div>
            <div className='flex flex-row justify-between'>

<h2 className="text-ellipsis text-xl text-gray-dark 2xl:mb-1.5">{"Small Menu"}</h2>
<h3 className="text-ellipsis text-xl text-gray-dark 2xl:mb-1.5">Credits: 20</h3>
</div>        
          </div>
      </div>
      <div className="listing-card group/item relative inline-flex w-full flex-col">
        <div className="relative w-full overflow-hidden rounded-xl">
       
       
            <div className="listing-item ">
           
          
                    <Image
                      className="aspect-[34/25] bg-gray-lighter"
                      src={"https://www.foodandwine.com/thmb/8N5jLutuTK4TDzpDkhMfdaHLZxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/McDonalds-Hacks-Menu-FT-1-BLOG0122-4ac9d62f6c9143be8da3d0a8553348b0.jpg"}
                      width={300}
                      height={300}
                      alt="boat"
                      priority
                    />
              
        
          
            </div>
     
        </div>
          <div className="content pt-3">
            <div className="mb-1 flex items-center gap-5">
             
            </div>
            <div className='flex flex-row justify-between'>

<h2 className="text-ellipsis text-xl text-gray-dark 2xl:mb-1.5">{"Medium Menu"}</h2>
<h3 className="text-ellipsis text-xl text-gray-dark 2xl:mb-1.5">Credits: 60</h3>
</div>
        
          </div>
      </div>

      <div className="listing-card group/item relative inline-flex w-full flex-col">
        <div className="relative w-full overflow-hidden rounded-xl">
       
       
            <div className="listing-item ">
           
          
                    <Image
                      className="aspect-[34/25] bg-gray-lighter"
                      src={"https://www.foodandwine.com/thmb/8N5jLutuTK4TDzpDkhMfdaHLZxI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/McDonalds-Hacks-Menu-FT-1-BLOG0122-4ac9d62f6c9143be8da3d0a8553348b0.jpg"}
                      width={300}
                      height={300}
                      alt="boat"
                      priority
                    />
              
        
          
            </div>
     
        </div>
          <div className="content pt-3">
            <div className="mb-1 flex items-center gap-5">
             
            </div>
            <div className='flex flex-row justify-between'>

            <h2 className="text-ellipsis text-xl text-gray-dark 2xl:mb-1.5">{"Large Menu"}</h2>
            <h3 className="text-ellipsis text-xl text-gray-dark 2xl:mb-1.5">Credits: 90</h3>
            </div>
        
          </div>
      </div>
</div>
<div>
<Button
                  size="sm"
                  className="rounded-lg !px-4 py-2 text-sm capitalize md:text-base bg-primaryBg mt-5"
                >
                  Load Products
                </Button>
</div>
  </div>


      
  </>
}
        {/* {component === 'allListing' && <AgentItemLists {...props} />} */}

        {component === 'contact' && <AgentContact {...props} />}
      </Container>
    </Fragment>
  );
};

const AgentProfileInfo = ({company}:{company:Company}) => {
  // const { processedData, loading } = props;
  // if (isEmpty(processedData) || loading) return <Loader />;
  // const {
  //   first_name,
  //   last_name,
  //   content,
  //   profile_pic,
  //   cover_pic,
  //   social_profile,
  // } = processedData[0];
const {openModal} = useModal()
  return (
    <Fragment>
      <BannerSection>
        <Image
          src={company?.fetaureImage}
          alt="Profile Cover Pic"
          fill
          style={{
            objectFit:"cover"
          }}
         
        />
      </BannerSection>

      <UserInfoArea>
        <Container fluid={true}>
          <ProfileImage>
            {company?.logo ? (
              <Image
                src={company?.logo}
                alt="Profile Pic"
                fill
                style={{
                  objectFit:"cover"
                }}
              />
            ) : (
              <ProfilePicLoader />
            )}
          </ProfileImage>

          <ProfileInformationArea>
            <ProfileInformation>
              <Heading content={`${company?.name}`} />
              <Text content={company?.description} />
            </ProfileInformation>
<div className=' flex flex-col justify-center align-middle items-center '>

            <SocialAccount className='flex flex-row'>
              <Popover content="Twitter">
                <a
                  href={""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoTwitter className="twitter" />
                </a>
              </Popover>
              <Popover content="Facebook">
                <a
                  href={""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoFacebook className="facebook" />
                </a>
              </Popover>
              <Popover content="Instagram">
                <a
                  href={""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoInstagram className="instagram" />
                </a>
              </Popover>
            </SocialAccount>
            <Button className=' mt-5'  onClick={() =>openModal('BOOK_NOW_MODAL')}  >
              Book Now
            </Button>
</div>
          </ProfileInformationArea>
        </Container>
      </UserInfoArea>
    </Fragment>
  );
};

export default function CompanyDetailsViewPage(props) {
  const {company} = useParams()
  const {data} = useCompanyQuery({
    variables:{
      where:{
slug:company
      }
    }
  })
  return (
    <AgentDetailsPage>
      <AgentProfileInfo  company={data?.company} />
      <ProfileNavigation {...props} />
    </AgentDetailsPage>
  );
}
