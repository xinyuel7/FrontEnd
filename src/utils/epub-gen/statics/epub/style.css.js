import { ROOT_CSS } from '../root.css';

export const OEBPS_STYLE_CSS = `
.epub-author {
  color: #555;
}

.epub-link {
  margin-bottom: 30px;
}

.epub-link a {
  color: #666;
  font-size: 90%;
}

.toc-author {
  font-size: 90%;
  color: #555;
}

.toc-link {
  color: #999;
  font-size: 85%;
  display: block;
}

#root h2, 
#root h3 {
  page-break-after: avoid;
  page-break-before: always;
}

#root p {
  widows: 2;
  orphans: 2;
}

` + ROOT_CSS;