import { create } from "xmlbuilder2";
import fs from "node:fs";

const baseUrl = "https://www.youanimators.es";

const routes = ["/", "/dropdowns", "/toasts", "/popups", "/new"];

const urlset = create({ version: "1.0" }).ele("urlset", {
  xmlns: "https://www.sitemaps.org/schemas/sitemap/0.9",
});

routes.forEach((route) => {
  const url = urlset.ele("url");
  url.ele("loc").txt(baseUrl + route);
  url.ele("lastmod").txt(new Date().toISOString());
});

const xml = urlset.end({ prettyPrint: true });

fs.writeFileSync("../../public/sitemap.xml", xml);
