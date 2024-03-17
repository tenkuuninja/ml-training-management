import Head from "next/head";

export function DefaultHead() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src *;
                        img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
                        style-src  'self' 'unsafe-inline' *"
        ></meta>
        <meta name="keywords" content="HTML, CSS, JavaScript" />
        <link rel="icon" type="image/png" href={"/favicon.png"} />
        <meta property="og:image" content={`/assets/images/image.png`} />
        <meta name="twitter:image" content={`/assets/images/image.png`} />
        <meta property="telegram:image" content={`/assets/images/image.png`} />
      </Head>
    </>
  );
}
