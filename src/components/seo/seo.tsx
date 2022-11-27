import { Helmet } from "react-helmet-async";
import { TSeo } from "./types";

export default function SEO({
  title,
  description,
  keywords,
  image,
  siteTitle,
}: TSeo) {
  return (
    <Helmet
      title={title}
      titleTemplate={siteTitle}
      link={[
        {
          rel: `canonical`,
          href: window.location.href,
        },
      ]}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
      ]}
    />
  );
}
