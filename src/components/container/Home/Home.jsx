import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { BsArrowRight } from 'react-icons/bs';
import { TypeAnimation } from 'react-type-animation';
import { client } from '../../../client';
import { urlFor } from '../../../client';
import { workNavs } from '../../../Data';
import Pagination from '../Wrapper/Pagination';
import './Home.scss';

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [Home, setHome] = useState([]);
  const [filterPost, setFilterPost] = useState([]);
  const [substringLength, setSubstringLength] = useState(130);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 800);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const getSubstringLength = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 800 && screenWidth < 1000) {
      return 275;
    } else if (screenWidth <= 800) {
      return 200;
    } else {
      return 130;
    }
  };

  const handleResize = useCallback(() => {
    const newSubstringLength = getSubstringLength();
    if (substringLength !== newSubstringLength) {
      setSubstringLength(newSubstringLength);
    }
  }, [substringLength]);

  useEffect(() => {
    const query = `*[_type == "post"]{
      title,
      slug,
      body,
      publishedAt,
      categories,
      mainImage{
        asset -> {
          _id,
          url
        },
        alt
      },
      "author": author -> name
    } | order(publishedAt desc)`;
    client
      .fetch(query)
      .then((data) => {
        setHome(data);
        setFilterPost(data);
      })
      .catch(console.error);

    const handleMobileView = () => {
      setIsMobileView(window.innerWidth < 800);
    };
    window.addEventListener('resize', handleMobileView);
    return () => {
      window.removeEventListener('resize', handleMobileView);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [substringLength, handleResize]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);

    setTimeout(() => {
      if (item === 'ALL') {
        setFilterPost(Home);
      } else {
        setFilterPost(Home.filter((work) => work.categories.includes(item)))
      }
      setCurrentPage(1);
    }, 500);
  };

  return (
    <div className="container" id="Home">
      <div className="blog-page">
        <TypeAnimation
          className="intro"
          sequence={[
            'I write here about my experiences.',
            1000,
            'I write here about evolving technologies.',
            1000,
            'I write here about my voyages.',
            1000,
            "I express my thoughts here.",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
        {/* <div className='featuredPosts'>
          <h4>Featured Articles</h4>
          <span>NO ARTICLES</span>
        </div> */}
        <div className="buttons">
          {isMobileView ? (
            <select
              value={activeFilter}
              onChange={(e) => handleWorkFilter(e.target.value)}
            >
              {workNavs.map((workNav, index) => (
                <option key={index} value={workNav}>
                  {workNav}
                </option>
              ))}
            </select>
          ) : (
            workNavs.map((workNav, index) => (
              <button
                key={index}
                onClick={() => handleWorkFilter(workNav)}
                className={`${activeFilter === workNav ? 'active' : ''}`}
              >
                {workNav}
              </button>
            ))
          )}
        </div>
        <div className="content">
          <div className="blogs">
            {filterPost
              .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
              .map((work, index) => (
                <Link to={`/blog/${work.slug.current}`} className="link">
                  <div className="description" key={index}>
                    <div className="blog_img">
                      <img src={urlFor(work.mainImage.asset).url()} alt={work.mainImage.alt} />
                    </div>
                    <div className="blog_details">
                      <h4>{work.title}</h4>
                      {work.body.map((child, childIndex) => {
                        const combinedText = child.children
                          ? child.children.map((textChild) => textChild.text).join(' ')
                          : '';
                        return (
                          <div className="brief-blog">
                            <p key={childIndex}>{`${combinedText.substring(0, substringLength)} . . .`}</p>
                          </div>
                        );
                      })[0]}
                      <span>
                        By {work.author} &middot;{' '}{format(new Date(work.publishedAt), 'dd MMMM yyyy')}
                        <div className="arrow-link">
                          <BsArrowRight className="arrow" />
                        </div>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={filterPost.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
