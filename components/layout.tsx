import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components';

const name = 'WebNadin';
export const siteTitle = 'Next.js Blog';

const HeaderImg = styled.img`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
  `;
const HeaderTitle = styled.h1`
    font-size: 1.5rem;
  `;

export default function Layout({
  children,
  home
  }: {
  children: React.ReactNode
  home?: boolean
}) {

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
          <HeaderImg
            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            src="/images/profile.jpg"
            alt={name}
          />
          <HeaderTitle>{name}</HeaderTitle>
        </>
          ) : (
          <>
          <Link href="/">
            <a>
              <img
                src="/images/profile.jpg"
                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
            </a>
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a className={utilStyles.colorInherit}>{name}</a>
            </Link>
          </h2>
        </>
          )}
      </header>
      <main>{children}</main>
      {!home && (
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
        )}
    </div>
  )
}