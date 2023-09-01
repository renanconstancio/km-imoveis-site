import { Helmet } from "react-helmet-async";

export type TSeo = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  siteTitle: string;
  robots?: boolean;
};

export function SEO({
  title,
  description,
  keywords,
  image,
  siteTitle,
  robots,
}: TSeo) {
  const seoMeta = [];

  // seoMeta.push({
  //   charSet: "UTF-8",
  // });

  // seoMeta.push({
  //   httpEquiv: `X-UA-Compatible`,
  //   content: "IE=edge",
  // });

  // seoMeta.push({
  //   name: `viewport`,
  //   content: "width=device-width, initial-scale=1.0",
  // });

  if (robots) {
    seoMeta.push({
      name: `robots`,
      content: "index,follow",
    });

    if (description)
      seoMeta.push({
        name: `description`,
        content: description,
      });

    if (keywords)
      seoMeta.push({
        name: `keywords`,
        content: keywords,
      });

    if (title)
      seoMeta.push({
        property: `og:title`,
        content: title,
      });

    if (description)
      seoMeta.push({
        property: `og:description`,
        content: description,
      });

    if (image)
      seoMeta.push({
        property: `og:image`,
        content: image,
      });

    seoMeta.push({
      property: `og:url`,
      content: window.location.href,
    });

    seoMeta.push({
      property: `og:type`,
      content: `website`,
    });
  }

  return (
    <Helmet
      title={title ? [title, siteTitle].join(" - ") : siteTitle}
      link={[
        {
          rel: `canonical`,
          href: window.location.href,
        },
      ]}
      meta={seoMeta}
      prioritizeSeoTags
    />
  );
}
