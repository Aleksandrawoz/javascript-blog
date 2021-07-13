'use strict';
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
  optArticleAuthorSelector = 'post.author';

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
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('link', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log('HTML:', html);
}

generateTitleLinks();



function generateTags() {


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
    console.log(html);
    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');
    console.log('tag name:', articleTags);

    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('tablica:', articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log('tag:', tag);


      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log('linkHTML:', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html:', html);
      /* END LOOP: for each tag */

    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    console.log('HTML:', html);
  }

  /* END LOOP: for every article: */
}


generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag kliknięty!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('constTag', tag);
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('allTags:' + tagLinks);
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

function generateAuthors () {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('authors:', articles);


  for (let article of articles) {
    const titleList = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);
    const linkHTML = '<a href="#author-' + articleAuthor +'">' + articleAuthor + '</a>';
    console.log('linkHTML', linkHTML);

    html = html + linkHTML;
    console.log('html:', html);

    titleList.innerHTML = html;



}

generateAuthors();
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Autor kliknięty!');
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const authorLinks = document.querySelectorAll('a.active[href^="author-#"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }
  const hrefAuthorLink = document.querySelectorAll('a[href="' + href + '"]');
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
}
