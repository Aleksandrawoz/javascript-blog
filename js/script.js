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
    optArticleTagsSelector = '.post-tags .list';
{

  function generateTitleLinks() {


    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    titleList.innerHTML = '';
    let html = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

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
}


function generateTags() {
  /* find all articles */


  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
  console.log('articles:', articles);

  /* START LOOP: for every article: */

  /* find tags wrapper */
  const tagsWrapper = article.querySelectorAll(optArticleTagsSelector);
  console.log(tagsWrapper);
  tagsWrapper.innerHTML = '';

  /* make html variable with empty string */
  let html = '';
  console.log(html);
  /* get tags from data-tags attribute */
  let articleTags = article.getAttribute('data-tags');
  console.log(data-tags);
  /* split tags into array */
  const articleTagsArray = articleTags.split(' ');
  console.log(articleTags);

  /* START LOOP: for each tag */
  for(let tag of articleTagsArray){
    console.log(tag);
  /* generate HTML of the link */

  /* add generated code to html variable */

  /* END LOOP: for each tag */

  /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
}

generateTags();
}
}
