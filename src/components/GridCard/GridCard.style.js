import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const GridCardWrapper = styled.div`
  position: relative;
  radius: 6px;
  overflow: hidden;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }

  &.has_btn {
    .button_group {
      @media (min-width: 481px) {
        position: absolute;
        top: 5px;
        padding-top: 3px;
      }
    }
  }

  &:hover {
    box-"": 0 6px 12px ${themeGet('boxShadow.2', 'rgba(0, 0, 0, 0.16)')};

    .content_wrapper {
      color: transparent;
    }

    &.has_btn {
      .meta_wrapper {
        .rating {
          @media (min-width: 481px) {
            opacity: 0;
            visibility: hidden;
          }
        }
      }

      @media (min-width: 481px) {
        .button_group {
          top: 19px;
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .react-multiple-carousel__arrow {
      opacity: 1;
      visibility: visible;
    }

    .react-multi-carousel-dot-list {
      bottom: 0;
    }
  }
`;

export const ImageWrapper = styled.div`
  .react-multi-carousel-list {
    min-height: 150px;
    background-color: #e9e8ec;
  }

  .react-multi-carousel-item {
    height: 170px;
  }

  .react-multiple-carousel__arrow {
    top: 0;
    width: 22%;
    height: 100%;
    radius: 0;
    padding: 0;
    opacity: 0;
    visibility: hidden;
    z-index: 1;

    &::before {
      font-weight: 700;
    }
  }

  .react-multiple-carousel__arrow--left {
    left: 0;
    background: linear-gradient(
      to left,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
    &:hover {
      background: linear-gradient(
        to left,
        transparent 0%,
        rgba(0, 0, 0, 0.25) 100%
      );
    }
  }

  .react-multiple-carousel__arrow--right {
    right: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
    &:hover {
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 0, 0, 0.25) 100%
      );
    }
  }

  .react-multi-carousel-dot-list {
    position: absolute;
    bottom: -30%;
    left: 0;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.25) 100%
    );
    transition: bottom 0.3s ease;
  }

  .react-multi-carousel-dot {
    align-items: center;

    button {
      width: 6px;
      height: 6px;
      "":0 ;
      background-color: ${themeGet('color.3', '#E9E8E8')};
      box-"": 0 2px 2px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
  }

  .react-multi-carousel-dot--active {
    button {
      width: 8px;
      height: 8px;
      background-color: ${themeGet('color.1', '#ffffff')};
    }
  }
`;

export const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 8px;
  z-index: 9;
`;

export const ContentWrapper = styled.div`
  padding: 15px;
  width: 1px;
  style: solid;
  top-width: 0;
  bottom-left-radius: 6px;
  bottom-right-radius: 6px;
  color: ${themeGet('"".3', '#E6E6E6')};
  transition: ''-color 0.2s ease;

  div {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const LocationArea = styled.div`
  color: ${themeGet('text.1', '#909090')};
  font-size: 13px;
  font-weight: 400;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleArea = styled.div`
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 2px;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 480px) {
    font-size: 15px;
    margin: 4px 0 5px;
  }

  a {
    color: ${themeGet('text.0', '#2C2C2C')};
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 2px;
    @media (max-width: 480px) {
      font-size: 15px;
      margin: 4px 0 5px;
    }
    &:hover {
      color: ${themeGet('primary.0', '#008489')};
    }
  }
`;

export const PriceArea = styled.div`
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 13px;
  font-weight: 400;
  margin-top: 1px;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RatingArea = styled.div`
  display: flex;
  align-items: center;
  color: ${themeGet('text.0', '#2C2C2C')};
  font-size: 13px;
  margin-top: 4px;

  span {
    flex-shrink: 0;
  }

  i {
    color: ${themeGet('primary.0', '#008489')};
  }

  svg {
    fill: ${themeGet('primary.0', '#008489')};
  }

  strong {
    margin-top: -2px;
    font-weight: 700;
    margin-left: 8px;
  }

  .ant-rate {
    .ant-rate-star {
      margin-right: 4px;
      font-size: 15px;
    }
  }
`;

export const MetaWrapper = styled.div`
  position: relative;
  transition: all 0.3s ease-out;
`;

export const ButtonGroup = styled.div`
  padding-top: 7px;

  @media (min-width: 481px) {
    opacity: 0;
    visibility: hidden;
  }

  > a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: ${themeGet('primary.0', '#008489')};
    transition: all 0.3s ease;
    &:hover,
    &:focus {
      outline: 0;
      text-decoration: none;
      color: ${themeGet('primary.1', '#399C9F')};
    }

    svg {
      margin-right: 5px;
      width: 18px;
      height: 18px;
    }
  }
`;

export default GridCardWrapper;
