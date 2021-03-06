'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links)
  });*/
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }


  /* [IN PROGRESS] add class 'active' to the clicked link */

  clickedElement.classList.add('active');


  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(this);
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = 'post.author',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optCloudClassPrefixAuthor = 'author-size-';

function generateTitleLinks(customSelector = '') {


  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = '';
  let html = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for (let article of articles) {
    console.log('articles:', articles);

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log('articleId:', articleId);


    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */


    /* create HTML of the link */
    const linkHTMLData = {
      id: articleId,
      title: articleTitle
    };
    const linkHTML = templates.articleLink(linkHTMLData);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log('HTML:', html);

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}
calculateTagsParams();
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log('allTags', allTags);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('tags', articles);
  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const titleList = article.querySelectorAll(optArticleTagsSelector);
    console.log(titleList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');
    console.log('tag name:', articleTags);


    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('tablica:', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log('tag:', tag);


      /* generate HTML of the link */
      const linkHTMLData = {
        id: 'tag-' + tag,
        title: tag
      };
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log('linkHTML', linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html:', html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;

        /* END LOOP: for each tag */

      } else {
        allTags[tag]++;
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      console.log('HTML:', html);


      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    const allTagsData = {
      tags: []
    };

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li> ';
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData:', allTagsData);
  }
}


generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag klikni??ty!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('constTag', tag);
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('allTags:', tagLinks);
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefTagLinks, 'link');
  /* START LOOP: for each found tag link */

  for (let hrefTagLink of hrefTagLinks) {


    /* add class active */
    hrefTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]')
  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999,
  };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }
  return params;
}
calculateAuthorsParams();
function calculateAuthorsClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefixAuthor + classNumber;
}



function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('authors:', articles);
  let allAuthors = {};
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams', authorsParams);
  console.log('allAuthors', allAuthors);

  for (let article of articles) {
    const titleList = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);
    const linkHTMLData = {
      id: 'author-' + articleAuthor,
      title: articleAuthor
    };
    const linkHTML = templates.authorLink(linkHTMLData);

    html = html + linkHTML;
    console.log('html:', html);

    if (!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }


    const authorList = document.querySelector('.authors');
    const allAuthorsData = {
      authors: []
    };

    for (let author in allAuthors) {

      const authorLinkHTML = calculateAuthorsClass(allAuthors[author], authorsParams) + ' ';
      console.log('authorLinkHTML:', authorLinkHTML);
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorsClass(allAuthors[author], authorsParams),
      });
    }
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log('allAuthorsData', allAuthorsData);
  }
}


generateAuthors();
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Autor klikni??ty!');
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authorLinks = document.querySelectorAll('a.active[href^="author-#"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }
  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let hrefAuthorLink of hrefAuthorLinks) {
    hrefAuthorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
    console.log('link', link);
  }
}
addClickListenersToAuthors();

