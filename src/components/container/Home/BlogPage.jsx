import React, { useEffect, useState } from 'react';
import "./BlogPage.scss";
import { urlFor, client } from "../../../client";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { LoadingLottie } from '../../../Data';
import { ErrorLottie } from '../../../Data';
import Prism from 'prismjs';

const BlogPage = () => {
    const { slug } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setError(false);
        const query = `*[_type == "post" && slug.current == "${slug}"]{
      title,
      slug,
      body,
      publishedAt,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      "author": author -> name
    }`;
        client
            .fetch(query)
            .then((data) => {
                if (data.length === 0) {
                    setError(true);
                } else {
                    setBlogData(data[0]);
                }
            })
            .catch(console.error)
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
            });
    }, [slug]);

    useEffect(() => {
        if (blogData && blogData.title) {
            document.title = `Reading | ${blogData.title}`;
            console.log(blogData.body)
            Prism.highlightAll();
        }
    }, [blogData]);

    const renderBlockContent = (blocks) => {
        return blocks.map((block, index) => {
            switch (block._type) {
                case 'block':
                    const marksToStyles = {
                        strong: { fontWeight: 'bold' },
                        em: { fontStyle: 'italic' },
                        underline: { textDecoration: 'underline' },
                        code: { fontFamily: 'monospace' },
                    };

                    const children = block.children.map((span, spanIndex) => {
                        const marks = span.marks || [];
                        const text = span.text;

                        const markElements = marks.map((mark, markIndex) => {
                            const markDef = block.markDefs.find((markDef) => markDef._key === mark);
                            if (markDef?._type === 'link' && markDef.href) {
                                return (
                                    <a
                                        key={markIndex}
                                        href={markDef.href}
                                        style={marksToStyles[mark]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {text}
                                    </a>
                                );
                            }
                            return (
                                <span key={markIndex} style={marksToStyles[mark]} className='blog_para'>
                                    {text}
                                </span>
                            );
                        });
                        return markElements.length ? markElements : text;
                    });
                    if (block.listItem === 'bullet' || block.listItem === 'number') {
                        const ListComponent = block.listItem === 'bullet' ? 'ul' : 'ol';
                        const indentation = block.level - 1;
                        const listItemStyle = {
                            marginLeft: `${indentation * 2}rem`,
                        };

                        return (
                            <ListComponent key={index} className="block-content-list">
                                <li style={listItemStyle}>
                                    {children}
                                </li>
                            </ListComponent>
                        );
                    }

                    return (
                        <p key={index} className="block-content-paragraph">
                            {children}
                        </p>
                    );

                case 'image':
                    return (
                        <div className='block-content-image'>
                            <img
                                key={index}
                                src={urlFor(block.asset._ref).url()}
                                alt={block.alt}
                                className="content-image"
                            />
                        </div>

                    );
                case 'myCodeField':
                    return (
                        <div key={index} className="block-content-code">
                            <div className="filename">{block.filename}</div>
                            <pre className="code-content">
                                <code>
                                    {block.code}
                                </code>
                            </pre>
                        </div>
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <div className="container" id="blogpage">
            <div className="blog">
                {isLoading && !error && (
                    <div className="loading">
                        <LoadingLottie />
                    </div>
                )}
                {error && (
                    <div className="error">
                        <ErrorLottie />
                    </div>
                )}
                {!isLoading && !error && blogData && (
                    <div>
                        <div className="blog_header">
                            <h2>{blogData.title}</h2>
                            {blogData.author && blogData.publishedAt && (
                                <span className='author_details'>
                                    By {blogData.author} &middot; {format(new Date(blogData.publishedAt), 'dd MMMM yyyy')}{' '}
                                </span>
                            )}
                        </div>
                        <div className='blog_content'>
                            {blogData.body && renderBlockContent(blogData.body)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
