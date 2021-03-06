import React, { useContext, useState, useEffect } from 'react';
import ArticleContext from '../../Context/article-context';

import classes from './Articles.module.css';
import MobileNavigationButtons from './MobileNavigationButtons';
import MainArticles from './MainArticles';
import LatestNews from './LatestNews';

const Articles = () => {
  const [visibleArticles, setVisibleArticles] = useState('featured');

  const ctx = useContext(ArticleContext);

  const handleScroll = e => {
    const target = e.target;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight) ctx.reachedEnd();
  };

  const handleFeaturedClick = () => {
    setVisibleArticles('featured');
  };

  const handleLatestClick = () => {
    setVisibleArticles('latest');
  };

  //determine if we're on a mobile device, lol
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;

  return (
    <>
      <MobileNavigationButtons visibleArticles={visibleArticles} onFeaturedCLick={handleFeaturedClick} onLatestClick={handleLatestClick} />
      <div className={classes['main_four']}>
        {visibleArticles === 'featured' && <MainArticles />}
        {visibleArticles === 'featured' && !isMobile && <LatestNews onHandleScroll={handleScroll} />}
        {visibleArticles === 'latest' && isMobile && <LatestNews onHandleScroll={handleScroll} />}
      </div>
    </>
  );
};

export default Articles;
