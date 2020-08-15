import React from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as HomeIcon } from './home.svg';

import './style.css';

const PartZero = React.lazy(() => import('./part-00/Homework'));
const PartOne  = React.lazy(() => import('./part-01/PartOneHome'));
const PartTwo  = React.lazy(() => import('./part-02/PartTwoHome'));
const PartThree  = React.lazy(() => import('./part-03/PartThreeHome'));
const PartFour  = React.lazy(() => import('./part-04/PartFourHome'));
const PartFive  = React.lazy(() => import('./part-05/PartFiveHome'));
// const PartSix  = React.lazy(() => import('./part-06/boilerplate'));
const PartSix  = React.lazy(() => import('./part-06/PartSix'));
const PartSeven  = React.lazy(() => import('./part-07/PartSeven'));

const PARTS_COMPONENTS = [ PartZero, PartOne, PartTwo, PartThree, PartFour, PartFive, PartSix, PartSeven ];

const Link = ({ number }) => <a href={`/${number}`}>Часть {number}</a>;
const Page = ({ children }) => <div className="Page">{children}</div>;

const HomeLink = ({ pageName }) =>
  <div className="HomeLink">
    <a href="/">
      <HomeIcon />
    </a>
    <p>{pageName}</p>
    <h1>React + Redux</h1>
  </div>

const PartsList = () => {
  const total_parts = PARTS_COMPONENTS.length;
  const list = Array(total_parts).fill().map((el, i) => <Link key={i} number={i} />);
  return <div className="PartsList">{list}</div>;
};

function getPartFromUrl() {
  const { pathname } = window.location;

  const [ part ] = pathname.split('/').filter(item => item !== '');
  const part_index = parseInt(part);

  return part_index;
}

function getPageComponent() {

    const part_index = getPartFromUrl();

    if (isNaN(part_index)) {
      return PartsList;
    }

    const PartComponent = PARTS_COMPONENTS[part_index];

    return PartComponent;
    
}

function getPageName() {

  const part_index = getPartFromUrl();

  if (!isNaN(part_index)) {
    return `Часть ${part_index}`;
  }

  return 'Список глав';

}

const CurrentComponent = getPageComponent();
const pageName = getPageName();

ReactDOM.render(
  // <React.StrictMode>
  <>
      <React.Suspense fallback={<div></div>}>
        <HomeLink pageName={pageName} />
        <Page>
          <CurrentComponent />
        </Page>
      </React.Suspense>
  </>,
  // </React.StrictMode>,
  document.getElementById('root')
);